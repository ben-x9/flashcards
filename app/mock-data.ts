import { Store } from 'root';
import { newStore as card } from 'components/card';

export const store: Store = {
  cards: [
    card({front: '食べる', back: 'to eat'}),
    card({front: '飲む', back: 'to drink'}),
    card({front: '寝る', back: 'to sleep'}),
    card({front: '起きる', back: 'to wake up'}),
  ],
};