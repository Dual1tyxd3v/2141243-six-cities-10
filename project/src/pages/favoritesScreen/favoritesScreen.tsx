import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import FavoritesScreenEmpty from '../../pages/favoritesScreenEmpty/favoritesScreenEmpty';
import { getFavoriteOffers, getFavoriteOffersReloadStatus } from '../../store/dataProcess/selectors';
import CardItem from '../../components/cardItem/cardItem';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { store } from '../../store';

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
                Object.keys(favoriteOffersObject).map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="/">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">

                      {
                        favoriteOffersObject[city].map((offer) => (
                          <CardItem classPrefix='favorites' key={offer.id} offer={offer} />
                        ))
                      }

                    </div>
                  </li>
                ))
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
