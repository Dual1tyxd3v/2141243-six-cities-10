import { Offers } from '../types/offer';

export const offers: Offers = [{
  bedrooms:3,
  city: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    name: 'Paris'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen'
  ],
  host: {
    avatarUrl: '/img/avatar-angelina.jpg',
    id: 3,
    isPro: false,
    name: 'Angelina'
  },
  id: 1,
  images: ['/img/apartment-01.jpg', '/img/apartment-02.jpg', '/img/apartment-03.jpg'],
  isFavorite: false,
  isPremium: true,
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 7
  },
  maxAdults: 2,
  previewImage: '/img/apartment-01.jpg',
  price: 160,
  rating: 4.5,
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment'
}, {
  bedrooms:2,
  city: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    name: 'Amsterdam'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen', 'Washing machine', 'Cabel TV', 'Coffee machine'
  ],
  host: {
    avatarUrl: '/img/avatar-max.jpg',
    id: 11,
    isPro: true,
    name: 'Homer'
  },
  id: 2,
  images: ['/img/room.jpg', '/img/apartment-02.jpg', '/img/apartment-03.jpg', '/img/apartment-01.jpg'],
  isFavorite: true,
  isPremium: true,
  location: {
    latitude: 52.369553943508,
    longitude: 4.85309666406198,
    zoom: 7
  },
  maxAdults: 4,
  previewImage: '/img/room.jpg',
  price: 90,
  rating: 4,
  title: 'Wood and stone place',
  type: 'room'
}, {
  bedrooms:2,
  city: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    name: 'Amsterdam'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen', 'Coffee machine'
  ],
  host: {
    avatarUrl: '/img/avatar-max.jpg',
    id: 1,
    isPro: true,
    name: 'Kerry King'
  },
  id: 3,
  images: ['/img/apartment-02.jpg', '/img/room.jpg'],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 52.3909553943508,
    longitude: 4.929309666406198,
    zoom: 7
  },
  maxAdults: 2,
  previewImage: '/img/apartment-02.jpg',
  price: 135,
  rating: 5,
  title: 'Canal View Prinsengracht',
  type: 'hotel'
}, {
  bedrooms:1,
  city: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    name: 'Hamburg'
  },
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  goods: [
    'Wi-Fi', 'Dishwasher', 'Kitchen', 'Cabel TV'
  ],
  host: {
    avatarUrl: '/img/avatar-angelina.jpg',
    id: 24,
    isPro: false,
    name: 'John'
  },
  id: 4,
  images: ['/img/apartment-03.jpg', '/img/apartment-01.jpg', '/img/room.jpg'],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 7
  },
  maxAdults: 2,
  previewImage: '/img/apartment-03.jpg',
  price: 150,
  rating: 3,
  title: 'Nice, cozy, warm big bed apartment',
  type: 'house'
}];

export const offersObject = Object.fromEntries(offers.map((m) => [m.city.name, offers.filter((offer) => offer.city.name === m.city.name)]));

export const cities = Object.keys(offersObject);
