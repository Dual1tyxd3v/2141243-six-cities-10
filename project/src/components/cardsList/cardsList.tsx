import CardItem from '../cardItem/cardItem';
import { Offer, Offers } from '../../types/offer';

type CardsListProps = {
  offers: Offers;
  onActiveCard: (offer: Offer) => void;
}

function CardsList({offers, onActiveCard}: CardsListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">

      {offers.map((offer: Offer) => (
        <CardItem
          key={offer.id}
          offer={offer}
          onActiveCard={onActiveCard}
        />
      ))}

    </div>
  );
}

export default CardsList;
