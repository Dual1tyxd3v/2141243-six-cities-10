import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CITIES } from '../../const';
import { changeCity } from '../../store/app-process/app-process';
import { getCity } from '../../store/app-process/selectors';
import { Link } from 'react-router-dom';

function Tabs(): JSX.Element {
  const city = useAppSelector(getCity);

  const dispatch = useAppDispatch();

  const onClickHandler = (evt: MouseEvent): void => {
    evt.preventDefault();
    if (evt.currentTarget.textContent) {
      const targetCity: string = evt.currentTarget.textContent;
      dispatch(changeCity(targetCity));
    }
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {
            Object.values(CITIES).map((selectedCity) => (
              <li key={selectedCity} className="locations__item">
                <Link
                  className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`}
                  to="/" onClick={onClickHandler}
                >
                  <span>{selectedCity}</span>
                </Link>
              </li>
            ))
          }

        </ul>
      </section>
    </div>
  );
}

export default Tabs;
