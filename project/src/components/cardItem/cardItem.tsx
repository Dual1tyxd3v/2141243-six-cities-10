import { memo, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { changeOfferFavoriteStatusAction } from '../../store/api-actions';
//import { changeFavoriteFlagInNearbyOffers } from '../../store/dataProcess/dataProcess';
import { getAuthorizationStatus } from '../../store/userProcess/selectors';
import { Offer } from '../../types/offer';

type OfferProps = {
  offer: Offer;
  onActiveCard?: (offer: Offer) => void;
  classPrefix: string;
}

function CardItem ({offer, onActiveCard, classPrefix}: OfferProps): JSX.Element {
  const {type, title, price, previewImage, rating, id, isPremium, isFavorite} = offer;

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  function onMouseOverHandler() {
    onActiveCard && onActiveCard(offer);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    authorizationStatus === AuthorizationStatus.Auth
      ? dispatch(changeOfferFavoriteStatusAction({id, status: Number(!isFavorite)}))
      : dispatch(redirectToRoute(AppRoute.Login));
  };
  return (
    <article className={`${classPrefix}__card place-card`} onMouseEnter={onMouseOverHandler}>
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> : null
      }
      <div className={`${classPrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`../offer/${id}`} title={`../offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={classPrefix === 'cities' ? '260' : '150'} height={classPrefix === 'cities' ? '200' : '110'} alt="Place" />
        </Link>
      </div>
      <div className={`${classPrefix === 'cities' ? '' : 'favorites__card-info '}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.floor(rating * 100 / 5)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`} title={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(CardItem);
