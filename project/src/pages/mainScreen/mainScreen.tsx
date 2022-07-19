/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react';
import CardsList from '../../components/cardsList/cardsList';
import Tabs from '../../components/tabs/tabs';
import Header from '../../components/header/header';
import {Offers, Offer} from '../../types/offer';
import Map from '../../components/map/map';

type MainProps = {
  placeNumber: number;
  offers: Offers;
}

function MainScreen({placeNumber, offers}: MainProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(offers[0]);

  const memoActiveCardHandle = useCallback((offer: Offer) => setActiveCard(offer), []);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs offers={offers}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placeNumber} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardsList onActiveCard={memoActiveCardHandle} offers={offers} />
            </section>
            <div className="cities__right-section">
              <Map offers={offers} activeCard={activeCard} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
