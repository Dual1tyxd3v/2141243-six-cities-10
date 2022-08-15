import { Comment, Comments, Offer, Offers } from '../types/offer';
import { address, datatype, date, image, internet, lorem, name } from 'faker';

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({min: 1, max: 5}),
  city: {
    name: address.cityName(),
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: datatype.number({min: 1, max: 10})
    },
  },
  description: lorem.text(),
  goods: datatype.array() as string[],
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title()
  },
  id: datatype.number(),
  images: new Array(datatype.number({min: 1, max: 5})).fill(image.imageUrl()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: datatype.number({min: 1, max: 10})
  },
  maxAdults: datatype.number({min: 1, max: 5}),
  previewImage: image.imageUrl(),
  price: datatype.number({min: 100, max: 2000}),
  rating: datatype.number({min: 1, max: 5}),
  title: name.title(),
  type: lorem.word()
});

export const makeFakeOffers = (): Offers => new Array(datatype.number({min: 10, max: 30})).fill(makeFakeOffer());

export const makeFakeComment = (): Comment => ({
  comment: lorem.text(),
  date: date.between(new Date('2000-01-01'), new Date()).toString(),
  id: datatype.number({min: 0, max: 1000}),
  rating: datatype.number({min: 1, max: 5}),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title()
  }
});

export const makeFakeComments = (): Comments => new Array(datatype.number({min: 12, max: 25})).fill(makeFakeComment());

export const makeFakeText = (): string => lorem.paragraph(5);
