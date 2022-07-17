import { useState } from 'react';
import CardItem from '../cardItem/cardItem';
import { Offer, Offers } from '../../types/offer';

type CardsListProps = {
  offers: Offers;
}

function CardsList({offers}: CardsListProps): JSX.Element {

  const [activeCard, setActiveCard] = useState(offers[0].id);

  function onActiveCardHandle(id: number) {
    if (activeCard !== id) {
      setActiveCard(id);
    }
  }

  return (
    <div className="cities__places-list places__list tabs__content">

      {offers.map((offer: Offer) => (
        <CardItem
          key={offer.id}
          offer={offer}
          onActiveCard={onActiveCardHandle}
        />
      ))}

    </div>
  );
}

export default CardsList;
