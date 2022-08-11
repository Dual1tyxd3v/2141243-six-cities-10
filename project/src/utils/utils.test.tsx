import { makeFakeOffers } from './mocks';
import { groupByCity } from './utils';

const mockOffers = makeFakeOffers();

describe('Utils tests', () => {
  it('should return correct changed array when called "groupByCity"', () => {
    const offersChanged = groupByCity(mockOffers);

    expect(mockOffers[0].city.name).toBe(offersChanged[0][0]);
    expect(mockOffers[0]).toEqual(offersChanged[0][1][0]);
    expect(mockOffers[0]).toStrictEqual(offersChanged[0][1][0]);
  });
});
