import { sortMenuTabs } from '../../const';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { useState, useCallback } from 'react';
import { Offers, Offer } from '../../types/offer';
import SortMenu from '../../components/sortMenu/sortMenu';
import MainScreenEmpty from '../mainScreenEmpty/mainScreenEmpty';
import CardItem from '../../components/cardItem/cardItem';

type MainScreenContentProps = {
  offers: Offers;
  city: string;
}

function MainScreenContent({offers, city}: MainScreenContentProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer>();
  const [showSortMenu, setShowSortMenu] = useState(false);

  const {sortBy} = useAppSelector((state) => state);

  const activeCardChangeHandle = useCallback((offer: Offer) => setActiveCard(offer), []);

  if (offers.length === 0) {
    return <MainScreenEmpty city={city}/>;
  }

  const sortOffers = (sortMethod: string) => {
    switch (sortMethod) {
      case sortMenuTabs.Rated:
        return offers.sort((a, b) => b.rating - a.rating);
      case sortMenuTabs.PriceHighToLow:
        return offers.sort((a, b) => b.price - a.price);
      case sortMenuTabs.PriceLowToHigh:
        return offers.sort((a, b) => a.price - b.price);
      default:
        return offers;
    }
  };
  sortOffers(sortBy);

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
              offers.map((offerItem) => <CardItem key={offerItem.id} offer={offerItem} onActiveCard={activeCardChangeHandle} />)
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
