import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('Reducer: user-process', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authorizationStatus: AuthorizationStatus.Unknown};
  });

  it('return initial State without addition parameteres', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  describe('checkAuthAction tests', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('loginAction tests', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth});
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
    expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
