import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoritesScreenEmpty from '../favorites-screen-empty/favorites-screen-empty';
import { getFavoriteOffers, getFavoriteOffersReloadStatus } from '../../store/data-process/selectors';
import CardItem from '../../components/card-item/card-item';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { store } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { groupByCity } from '../../utils/utils';
import { useMemo } from 'react';
import { changeCity } from '../../store/app-process/app-process';
import { AppRoute } from '../../const';

store.dispatch(fetchFavoriteOffersAction());

function FavotitesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const offersFavorites = useAppSelector(getFavoriteOffers);
  const isLoaded = useAppSelector(getFavoriteOffersReloadStatus);

  const offersFavoritesGrouped = useMemo(() => groupByCity(offersFavorites), [offersFavorites]);

  if (offersFavorites.length === 0 && !isLoaded) {
    return <FavoritesScreenEmpty />;
  }

  return (
    <>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {
                offersFavoritesGrouped.map((group, i) => {
                  const keyValue = `${group[0]}_${i}`;
                  return (
                    <li key={keyValue} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link
                            className="locations__item-link"
                            to="/"
                            onClick={(evt) => {
                              evt.preventDefault();
                              dispatch(changeCity(group[0]));
                              navigate(AppRoute.Main);
                            }}
                          >
                            <span>{group[0]}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">

                        {
                          group[1].map((offer, j) => {
                            const key = `${offer.id}__${j}`;
                            return (
                              <CardItem classPrefix='favorites' key={key} offer={offer} />
                            );
                          }
                          )
                        }
                      </div>
                    </li>
                  );
                })
              }

            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavotitesScreen;
