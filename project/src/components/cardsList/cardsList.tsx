import { useState, useCallback } from 'react';
import CardItem from '../cardItem/cardItem';
import { Offer, Offers } from '../../types/offer';

type CardsListProps = {
  offers: Offers;
}

function CardsList({offers}: CardsListProps): JSX.Element {

  const [, setActiveCard] = useState(offers[0].id);

  const memoActiveCardHandle = useCallback((id: number) => setActiveCard(id), []);

  return (
    <div className="cities__places-list places__list tabs__content">

      {offers.map((offer: Offer) => (
        <CardItem
          key={offer.id}
          offer={offer}
          onActiveCard={memoActiveCardHandle}
        />
      ))}

    </div>
  );
}

export default CardsList;
