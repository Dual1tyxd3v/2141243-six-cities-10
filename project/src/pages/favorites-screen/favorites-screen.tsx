import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import FavoritesScreenEmpty from '../favorites-screen-empty/favorites-screen-empty';
import { getFavoriteOffers, getFavoriteOffersReloadStatus } from '../../store/data-process/selectors';
import CardItem from '../../components/card-item/card-item';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { store } from '../../store';
import { Link } from 'react-router-dom';

store.dispatch(fetchFavoriteOffersAction());
function FavotitesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isLoaded = useAppSelector(getFavoriteOffersReloadStatus);

  if (favoriteOffers.length === 0 && !isLoaded) {
    return <FavoritesScreenEmpty />;
  }

  const favoriteOffersObject = Object.fromEntries(favoriteOffers.map((m) => [m.city.name, favoriteOffers.filter((it) => it.city.name === m.city.name)]));

  return (
    <>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {
                Object.keys(favoriteOffersObject).map((city, i) => {
                  const keyValue = `${city}_${i}`;
                  return (
                    <li key={keyValue} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to="/">
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">

                        {
                          favoriteOffersObject[city].map((offer, j) => {
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
