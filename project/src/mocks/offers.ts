import { Comments } from '../types/offer';


/* export const offersObject = Object.fromEntries(offers.map((m) => [m.city.name, offers.filter((offer) => offer.city.name === m.city.name)])); */


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
