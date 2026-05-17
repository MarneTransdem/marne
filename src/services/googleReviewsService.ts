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
      const place = new placesLib.Place({ id: placeId });
      await place.fetchFields({
        fields: ['reviews', 'rating', 'userRatingCount']
      });

      if (place.reviews) {
        // Simple sync strategy: avoid duplicates by checking author name + text snippet (since no ID)
        // or just clear and refill for simplicity if the list is small (max 5)
        
        const currentReviewsSnap = await getDocs(collection(db, 'reviews'));
        const existingTexts = new Set(currentReviewsSnap.docs.map(d => d.data().text));

        for (const r of place.reviews) {
          if (!existingTexts.has(r.text)) {
            await addDoc(collection(db, 'reviews'), {
              authorName: r.authorName,
              authorPhotoUrl: r.authorPhotoUrl,
              rating: r.rating,
              text: r.text,
              publishTime: r.publishTime?.toISOString(),
              relativePublishTimeDescription: r.relativePublishTimeDescription,
              createdAt: serverTimestamp()
            });
          }
        }
        await fetchFromFirestore();
      }
    } catch (error) {
      console.error('Error syncing with Google:', error);
    }
  };

  useEffect(() => {
    fetchFromFirestore();
  }, []);

  return { reviews, isLoading, syncWithGoogle };
};
