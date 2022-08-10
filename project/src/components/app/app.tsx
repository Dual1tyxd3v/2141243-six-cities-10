import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import {AppRoute} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';

function App(): JSX.Element {

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen />}/>
      <Route path={AppRoute.Login} element={<LoginScreen />}/>
      <Route path={AppRoute.Favorites} element={
        <PrivateRoute>
          <FavotitesScreen />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Room} element={<RoomScreen />} />
      <Route path='*' element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;
