import { MouseEvent} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserInfo } from '../../services/user-info';
import { redirectToRoute } from '../../store/action';
import { fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction, logoutAction } from '../../store/api-actions';
import { clearFavoriteOffers } from '../../store/data-process/data-process';
import { getFavoriteOffers } from '../../store/data-process/selectors';

function HeaderNavLogged(): JSX.Element {
  const dispatch = useAppDispatch();

  const email = getUserInfo();
  const offers = useAppSelector(getFavoriteOffers);

  const favoriteOffersCount = offers ? offers.filter((offer) => offer.isFavorite).length : 0;

  const urlPath = useLocation().pathname;
  const id = Number(urlPath.slice(urlPath.lastIndexOf('/') + 1));

  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(fetchFavoriteOffersAction());
    dispatch(redirectToRoute(AppRoute.Favorites));
  };
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} title={AppRoute.Favorites} onClick={handleClick} >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
            <span className="header__favorite-count">{favoriteOffersCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to='/logout'
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
              dispatch(fetchOffersAction());
              dispatch(clearFavoriteOffers());
              if (urlPath.includes('offer')) {
                dispatch(fetchNearbyOffersAction(id));
              }
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavLogged;
