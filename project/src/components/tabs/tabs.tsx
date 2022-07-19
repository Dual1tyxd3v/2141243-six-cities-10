import { Offers } from '../../types/offer';

type TabsProps = {
  offers: Offers;
}

function Tabs({offers}: TabsProps): JSX.Element {
  const cities = [...new Set(offers.map((offer) => offer.city.name))];

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {
            cities.map((city) => (
              <li key={city} className="locations__item">
                <a className={`locations__item-link tabs__item ${city === 'Amsterdam' ? 'tabs__item tabs__item--active' : ''}`} href="/">
                  <span>{city}</span>
                </a>
              </li>
            ))
          }

        </ul>
      </section>
    </div>
  );
}

export default Tabs;
