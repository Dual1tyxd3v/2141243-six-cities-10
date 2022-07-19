import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainScreen from '../../pages/mainScreen/mainScreen';
import LoginScreen from '../../pages/loginScreen/loginScreen';
import FavotitesScreen from '../../pages/favoritesScreen/favoritesScreen';
import NotFoundScreen from '../../pages/notFoundScreen/notFoundScreen';
import RoomScreen from '../../pages/roomScreen/roomScreen';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import {Offers, OffersObject} from '../../types/offer';

type AppProps = {
  placeNumber: number;
  offers: Offers;
  authStatus: AuthorizationStatus;
  offersObject: OffersObject
}

function App({placeNumber, offers, authStatus, offersObject}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen placeNumber={placeNumber} offers={offers} offersObject={offersObject}/>}/>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authStatus}>
            <FavotitesScreen offers={offers}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Room} element={<RoomScreen offers={offers}/>} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
