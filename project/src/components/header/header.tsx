import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/userProcess/selectors';
import HeaderNavLogged from '../headerNavLogged/headerNavLogged';
import HeaderNavNotLogged from '../headerNavNotLogged/headerNavNotLogged';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main} title={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {
            authorizationStatus === AuthorizationStatus.Auth ?
              <HeaderNavLogged /> :
              <HeaderNavNotLogged />
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
