import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/mainScreen/mainScreen';
import LoginScreen from '../../pages/loginScreen/loginScreen';
import FavotitesScreen from '../../pages/favoritesScreen/favoritesScreen';
import NotFoundScreen from '../../pages/notFoundScreen/notFoundScreen';
import RoomScreen from '../../pages/roomScreen/roomScreen';
import {AppRoute} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import HistoryRouter from '../historyRoute/historyRoute';
import { browserHistory } from '../../browserHistory';

function App(): JSX.Element {

  return (
    <HistoryRouter history={browserHistory}>
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
    </HistoryRouter>
  );
}

export default App;
