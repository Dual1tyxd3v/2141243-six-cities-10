import { CITIES, sortMenuTabs } from '../../const';
import { AppProcess } from '../../types/state';
import { appProcess, changeCity, changeSortBy, setErrorMessage } from './app-process';

describe('Reducer: app-process', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = {
      city: 'Paris',
      sortBy: 'Popular',
      error: null
    };
  });

  it('should return initial state without additional parameteres', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: 'Paris',
        sortBy: 'Popular',
        error: null
      });
  });

  it('should update city by a given value', () => {
    expect(appProcess.reducer(state, changeCity(CITIES.Brussels)))
      .toEqual({...state, city: CITIES.Brussels});
  });

  it('should update sortBy by a given value', () => {
    expect(appProcess.reducer(state, changeSortBy(sortMenuTabs.Rated)))
      .toEqual({...state, sortBy: sortMenuTabs.Rated});
  });

  it('should update error by a given value', () => {
    expect(appProcess.reducer(state, setErrorMessage('Some error message')))
      .toEqual({...state, error: 'Some error message'});
  });
});
