import { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { collection, addDoc, getDocs, query, where, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Review {
  id?: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  createdAt: any;
}

export const useGoogleReviews = (placeId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const placesLib = useMapsLibrary('places');

  const fetchFromFirestore = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('publishTime', 'desc'), limit(5));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(docs);
    } catch (error) {
      console.error('Error fetching reviews from Firestore:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncWithGoogle = async () => {
    if (!placesLib || !placeId) return;

    try {
      let place: google.maps.places.Place | null = null;
      
      console.log('Attempting sync with Place ID:', placeId);
      
      try {
        const testPlace = new placesLib.Place({ id: placeId });
        await testPlace.fetchFields({
          fields: ['reviews', 'rating', 'userRatingCount', 'displayName']
        });
        place = testPlace;
        console.log('Successfully fetched fields for Place ID:', placeId);
      } catch (error: any) {
        console.log('Initial Place ID lookup failed, attempting search fallback. Error:', error.message);
        
        // Try searching for the business
        const searchResponse = await placesLib.Place.searchByText({
          textQuery: 'Marne Transdem 43 Rue des Maraîchers 75020 Paris',
          fields: ['id', 'displayName', 'formattedAddress']
        });
        
        if (searchResponse.places && searchResponse.places.length > 0) {
          const foundPlace = searchResponse.places[0];
          console.log('Found Place via search fallback:', {
            id: foundPlace.id,
            name: foundPlace.displayName,
            address: foundPlace.formattedAddress
          });
          
          // CRITICAL: We must fetch reviews specifically for the found place
          await foundPlace.fetchFields({
            fields: ['reviews', 'rating', 'userRatingCount']
          });
          place = foundPlace;
        } else {
          // Fallback search with just name and city
          const fallbackSearch = await placesLib.Place.searchByText({
            textQuery: 'Marne Transdem Paris',
            fields: ['id', 'displayName', 'formattedAddress']
          });
          
          if (fallbackSearch.places && fallbackSearch.places.length > 0) {
            const foundPlace = fallbackSearch.places[0];
            await foundPlace.fetchFields({
              fields: ['reviews', 'rating', 'userRatingCount']
            });
            place = foundPlace;
          } else {
            throw new Error('Business not found via any search fallback');
          }
        }
      }

      if (place && place.reviews) {
        console.log(`Processing ${place.reviews.length} reviews from Google`);
        const currentReviewsSnap = await getDocs(collection(db, 'reviews'));
        const existingTexts = new Set(currentReviewsSnap.docs.map(d => d.data().text));

        let addedCount = 0;
        for (const r of place.reviews) {
          const rawAuthorName = r.authorAttribution?.displayName || (r as any).authorName;
          const rawText = r.text || (r as any).text;
          const rawPhotoUrl = r.authorAttribution?.photoUri || (r as any).authorPhotoUrl;
          const rawRating = r.rating || (r as any).rating;

          if (rawText && rawAuthorName && !existingTexts.has(rawText)) {
            await addDoc(collection(db, 'reviews'), {
              authorName: String(rawAuthorName || 'Client Anonyme'),
              authorPhotoUrl: rawPhotoUrl ? String(rawPhotoUrl) : null,
              rating: typeof rawRating === 'number' ? rawRating : 5,
              text: String(rawText),
              publishTime: r.publishTime?.toISOString() || new Date().toISOString(),
              relativePublishTimeDescription: r.relativePublishTimeDescription || 'Récemment',
              createdAt: serverTimestamp()
            });
            addedCount++;
          }
        }
        console.log(`Sync complete. Added ${addedCount} new reviews.`);
        await fetchFromFirestore();
      } else {
        console.log('No reviews found for the establishment.');
      }
    } catch (error: any) {
      console.error('Error syncing with Google:', error);
      const errorMessage = error.message || 'Erreur inconnue';
      alert(`Erreur lors de la synchronisation: ${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchFromFirestore();
  }, []);

  return { reviews, isLoading, syncWithGoogle };
};
