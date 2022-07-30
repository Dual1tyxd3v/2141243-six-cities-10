import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cities } from '../../const';
import { changeCity } from '../../store/action';

function Tabs(): JSX.Element {
  const {city} = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const onClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (e.currentTarget.textContent) {
      const targetCity = e.currentTarget.textContent;
      dispatch(changeCity({city: targetCity}));
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {
            cities.map((selectedCity) => (
              <li key={selectedCity} className="locations__item">
                <a className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item tabs__item--active' : ''}`} href="/" onClick={onClickHandler}>
                  <span>{selectedCity}</span>
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
