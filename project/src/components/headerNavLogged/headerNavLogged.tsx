import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

function HeaderNavLogged(): JSX.Element {
  const {userInfo} = useAppSelector((state) => state);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} title={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userInfo?.email}</span>
            <span className="header__favorite-count">3</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavLogged;
