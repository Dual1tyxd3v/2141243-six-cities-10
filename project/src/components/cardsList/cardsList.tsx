import { useState } from 'react';
import CardItem from '../cardItem/cardItem';
import { Offer, Offers } from '../../types/offer';

type CardsListProps = {
  offers: Offers;
}

function CardsList({offers}: CardsListProps): JSX.Element {
  // устанавливаю начальное состояние на 1 элемент массива с карточками
  const [activeCard, setActiveCard] = useState(offers[0].id);
  // а здесь доп проверка на повторение ID дабы исключить повторную перерисовку
  function onActiveCardHandle(id: number) {
    if (activeCard !== id) {
      setActiveCard(id);
    }
  }

  return (
    <>
      {offers.map((offer: Offer) => (
        <CardItem
          key={offer.id}
          offer={offer}
          onActiveCard={onActiveCardHandle}
        />
      ))}
    </>
  );
}

export default CardsList;
