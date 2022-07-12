import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainScreen from '../../pages/mainScreen/mainScreen';
import LoginScreen from '../../pages/loginScreen/loginScreen';
import FavotitesScreen from '../../pages/favoritesScreen/favoritesScreen';
import NotFoundScreen from '../../pages/notFoundScreen/notFoundScreen';
import RoomScreen from '../../pages/roomScreen/roomScreen';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';

type AppProps = {
  placeNumber: number,
}

function App({placeNumber}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen placeNumber={placeNumber}/>} />
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavotitesScreen />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Room} element={<RoomScreen />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
