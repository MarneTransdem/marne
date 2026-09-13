import { useEffect, type RefObject } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapProvider } from '../common/MapProvider';

export type SelectedHomeAddress = { address: string; city: string; zip: string };
type Props = {
  fromRef: RefObject<HTMLInputElement | null>;
  toRef: RefObject<HTMLInputElement | null>;
  onSelect: (side: 'from' | 'to', address: SelectedHomeAddress) => void;
};

function AddressBindings({ fromRef, toRef, onSelect }: Props) {
  const places = useMapsLibrary('places');
  useEffect(() => {
    if (!places) return;
    const cleanups = (['from', 'to'] as const).map(side => {
      const input = (side === 'from' ? fromRef : toRef).current;
      if (!input) return () => {};
      const autocomplete = new places.Autocomplete(input, {
        componentRestrictions: { country: 'fr' },
        fields: ['address_components', 'formatted_address'],
        types: ['address'],
      });
      const listener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.address_components || !place.formatted_address) return;
        const component = (type: string) => place.address_components?.find(item => item.types.includes(type))?.long_name || '';
        onSelect(side, {
          address: place.formatted_address,
          city: component('locality') || component('postal_town'),
          zip: component('postal_code'),
        });
      });
      return () => { listener.remove(); autocomplete.unbindAll(); };
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, [places, fromRef, toRef, onSelect]);
  return null;
}

export default function HomeAddressAutocomplete(props: Props) {
  return <MapProvider><AddressBindings {...props} /></MapProvider>;
}
