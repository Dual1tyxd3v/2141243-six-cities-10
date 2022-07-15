import { Offers } from '../types/offer';

export const offers: Offers = [{
  bedrooms:3,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: 'Paris'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen'
  ],
  host: {
    avatarUrl: '../../public/img/avatar-angelina.jpg',
    id: 3,
    isPro: false,
    name: 'Angelina'
  },
  id: 1,
  images: ['../../public/img/apartment-01.jpg', '../../public/img/apartment-02.jpg', '../../public/img/apartment-03.jpg'],
  isFavorite: false,
  isPremium: true,
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 7
  },
  maxAdults: 2,
  previewImage: '../../public/img/apartment-01.jpg',
  price: 160,
  rating: 4,
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment'
}, {
  bedrooms:2,
  city: {
    location: {
      latitude: 32.370216,
      longitude: 24.895168,
      zoom: 10
    },
    name: 'Amsterdam'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen', 'Washing machine', 'Cabel TV', 'Coffee machine'
  ],
  host: {
    avatarUrl: '../../public/img/avatar-angelina.jpg',
    id: 11,
    isPro: true,
    name: 'Homer'
  },
  id: 2,
  images: ['../../public/img/room.jpg', '../../public/img/apartment-02.jpg', '../../public/img/apartment-03.jpg', '../../public/img/apartment-01.jpg'],
  isFavorite: true,
  isPremium: true,
  location: {
    latitude: 32.370216,
    longitude: 24.895168,
    zoom: 7
  },
  maxAdults: 4,
  previewImage: '../../public/img/room.jpg',
  price: 90,
  rating: 4,
  title: 'Wood and stone place',
  type: 'room'
}, {
  bedrooms:2,
  city: {
    location: {
      latitude: 21.370216,
      longitude: 9.895168,
      zoom: 10
    },
    name: 'Paris'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen', 'Coffee machine'
  ],
  host: {
    avatarUrl: '../../public/img/avatar-angelina.jpg',
    id: 1,
    isPro: true,
    name: 'Kerry King'
  },
  id: 3,
  images: ['../../public/img/apartment-02.jpg', '../../public/img/room.jpg'],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 21.370216,
    longitude: 9.895168,
    zoom: 7
  },
  maxAdults: 2,
  previewImage: '../../public/img/apartment-02.jpg',
  price: 135,
  rating: 5,
  title: 'Canal View Prinsengracht',
  type: 'hotel'
}, {
  bedrooms:1,
  city: {
    location: {
      latitude: 73.370216,
      longitude: 62.895168,
      zoom: 10
    },
    name: 'Hamburg'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen', 'Cabel TV'
  ],
  host: {
    avatarUrl: '../../public/img/avatar-angelina.jpg',
    id: 24,
    isPro: false,
    name: 'John'
  },
  id: 4,
  images: ['../../public/img/apartment-03.jpg', '../../public/img/apartment-01.jpg', '../../public/img/room.jpg'],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 73.370216,
    longitude: 62.895168,
    zoom: 7
  },
  maxAdults: 2,
  previewImage: '../../public/img/apartment-03.jpg',
  price: 150,
  rating: 3,
  title: 'Nice, cozy, warm big bed apartment',
  type: 'house'
}];
