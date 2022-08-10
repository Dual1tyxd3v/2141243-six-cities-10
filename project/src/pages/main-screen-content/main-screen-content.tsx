import { sortMenuTabs } from '../../const';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { useState, useCallback } from 'react';
import { Offers, Offer } from '../../types/offer';
import SortMenu from '../../components/sort-menu/sort-menu';
import MainScreenEmpty from '../main-screen-empty/main-screen-empty';
import CardItem from '../../components/card-item/card-item';
import { getSortMethod } from '../../store/app-process/selectors';

type MainScreenContentProps = {
  offers: Offers;
  city: string;
}

function MainScreenContent({offers, city}: MainScreenContentProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer>();
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortBy = useAppSelector(getSortMethod);

  const activeCardChangeHandle = useCallback(
    (offer: Offer, type: string) => {
      setActiveCard(type === 'mouseenter' ? offer : undefined);
    }, []);

  if (offers.length === 0) {
    return <MainScreenEmpty city={city}/>;
  }

  const offersCopy = JSON.parse(JSON.stringify(offers));
  const sortOffers = (sortMethod: string, arr: Offers) => {
    switch (sortMethod) {
      case sortMenuTabs.Popular:
        return offers;
      case sortMenuTabs.Rated:
        return arr.sort((a, b) => b.rating - a.rating);
      case sortMenuTabs.PriceHighToLow:
        return arr.sort((a, b) => b.price - a.price);
      case sortMenuTabs.PriceLowToHigh:
        return arr.sort((a, b) => a.price - b.price);
      default:
        return offers;
    }
  };
  const offersSorted = sortOffers(sortBy, offersCopy);

  const onSortMenuHandler = () => {
    setShowSortMenu(!showSortMenu);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0} onClick={onSortMenuHandler}>
              &nbsp;{sortBy}
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            {
              showSortMenu ? <SortMenu onCloseMenu={onSortMenuHandler} /> : null
            }
          </form>
          <div className="cities__places-list places__list tabs__content">
            {
              offersSorted.map((offerItem, i) => {
                const keyValue = `offer_${i}_${offerItem.id}`;
                return (
                  <CardItem
                    classPrefix='cities'
                    key={keyValue}
                    offer={offerItem}
                    onActiveCard={activeCardChangeHandle}
                  />);
              })
            }
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map" >
            <Map offers={offers} activeCard={activeCard} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainScreenContent;
