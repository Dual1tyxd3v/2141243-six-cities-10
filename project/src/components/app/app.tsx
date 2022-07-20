import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainScreen from '../../pages/mainScreen/mainScreen';
import LoginScreen from '../../pages/loginScreen/loginScreen';
import FavotitesScreen from '../../pages/favoritesScreen/favoritesScreen';
import NotFoundScreen from '../../pages/notFoundScreen/notFoundScreen';
import RoomScreen from '../../pages/roomScreen/roomScreen';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import {Offers, Comments} from '../../types/offer';

type AppProps = {
  placeNumber: number;
  offers: Offers;
  authStatus: AuthorizationStatus;
  comments: Comments;
}

function App({placeNumber, offers, authStatus, comments}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen placeNumber={placeNumber} offers={offers} />}/>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authStatus}>
            <FavotitesScreen offers={offers}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Room} element={<RoomScreen offers={offers} comments={comments}/>} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
