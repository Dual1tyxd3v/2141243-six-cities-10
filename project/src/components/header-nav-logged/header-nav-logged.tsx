import { MouseEvent} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserInfo } from '../../services/user-info';
import { fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction, logoutAction } from '../../store/api-actions';
import { clearFavoriteOffers } from '../../store/data-process/data-process';
import { getFavoriteOffers } from '../../store/data-process/selectors';

function HeaderNavLogged(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = getUserInfo();
  const offers = useAppSelector(getFavoriteOffers);

  const favoriteOffersCount: number = offers.filter((offer) => offer.isFavorite).length;

  const urlPath: string = useLocation().pathname;
  const id = Number(urlPath.slice(urlPath.lastIndexOf('/') + 1));

  const handleClick = (evt: MouseEvent): void => {
    evt.preventDefault();
    dispatch(fetchFavoriteOffersAction());
    navigate(AppRoute.Favorites);
  };
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} title={AppRoute.Favorites} onClick={handleClick} data-testid="emailLink">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
            <span className="header__favorite-count" data-testid="offersCounter">{favoriteOffersCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to='/logout'
            data-testid="sign-out"
            onClick={(evt: MouseEvent): void => {
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
