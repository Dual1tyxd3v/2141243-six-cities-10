import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundScreen from '../../pages/notFoundScreen/notFoundScreen';
import ReviewList from '../../components/reviewList/reviewList';
import Map from '../../components/map/map';
import CardsList from '../../components/cardsList/cardsList';
import { fetchNearbyOffersAction } from '../../store/api-actions';
import { useLayoutEffect } from 'react';

function RoomScreen(): JSX.Element {
  const params = useParams();
  const paramsId = Number(params.id);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(fetchNearbyOffersAction(paramsId));
  }, [paramsId, dispatch]);

  const {offers, nearbyOffers, comments} = useAppSelector((state) => state);

  const offer = offers.find((it) => it.id === paramsId);

  if (!offer) {
    return <NotFoundScreen />;
  }

  const {images, id, title, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {
                images.map((image, i) => (
                  <div key={`${id}-${image}`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Studio" />
                  </div>
                ))
              }

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button property__bookmark-button--active button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.floor(rating * 100 / 5)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">

                  {
                    goods.map((good) => (
                      <li key={`${id}-${good}`} className="property__inside-item">
                        {good}
                      </li>
                    ))
                  }

                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro ?
                      <span className="property__user-status">
                        Pro
                      </span> : null
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>

                </div>
              </div>
              <ReviewList comments={comments}/>
            </div>
          </div>
          <section className="property__map map" >
            <Map offers={nearbyOffers.concat(offer)} activeCard={offer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardsList offers={nearbyOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default RoomScreen;
