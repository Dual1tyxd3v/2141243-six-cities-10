import { Offers, Comments } from '../types/offer';

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

export const comments: Comments = [{
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  date: 'Tue Jul 19 2022 16:34:34 GMT+0700 (Новосибирск, стандартное время)',
  id: 13,
  rating: 4,
  user: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 6,
    isPro: true,
    name: 'Ann'
  }
}, {
  comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  date: 'Tue Jul 19 2022 22:47:34 GMT+0700 (Новосибирск, стандартное время)',
  id: 1,
  rating: 3.8,
  user: {
    avatarUrl: 'img/avatar-max.jpg',
    id: 1,
    isPro: false,
    name: 'Oliver'
  }
}, {
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  date: 'Mon Dec 11 2022 18:31:34 GMT+0700 (Новосибирск, стандартное время)',
  id: 2,
  rating: 2.4,
  user: {
    avatarUrl: 'img/avatar-max.jpg',
    id: 2,
    isPro: true,
    name: 'Walter White'
  }
}, {
  comment: ' Dolorum eius, veniam temporibus perferendis sapiente laboriosam ipsa blanditiis consequatur natus non magnam accusamus consequuntur placeat quos possimus officia, voluptatum laborum commodi!',
  date: 'Sat Jan 27 2021 10:04:34 GMT+0700 (Новосибирск, стандартное время)',
  id: 3,
  rating: 4.6,
  user: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 3,
    isPro: false,
    name: 'Angelina'
  }
}];
