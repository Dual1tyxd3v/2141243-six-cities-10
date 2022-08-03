import { memo } from 'react';
import { Link } from 'react-router-dom';
import { APIRoute, AppRoute } from '../../const';
import HeaderNav from '../headerNav/headerNav';

function Header(): JSX.Element {
  const currentUrlPath = window.location.pathname;

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
            currentUrlPath === APIRoute.Login ? null : <HeaderNav />
          }
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
