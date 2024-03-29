import Tabs from '../../components/tabs/tabs';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import MainScreenContent from '../main-screen-content/main-screen-content';
import { getLoadedStatus, getOffers } from '../../store/data-process/selectors';
import { getCity } from '../../store/app-process/selectors';
import { Offers } from '../../types/offer';

function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const isLoaded = useAppSelector(getLoadedStatus);

  const filteredOffers: Offers = offers.filter((offer) => offer.city.name === city);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${filteredOffers.length === 0 ? 'page__main--index-empty' : ''}`} data-testid="mainContainer">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        {
          isLoaded
            ? <h2 style={{textAlign:'center'}}>Loading DATA</h2>
            : <MainScreenContent offers={filteredOffers} city={city}/>
        }
      </main>
    </div>
  );
}

export default MainScreen;
