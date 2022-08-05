import Tabs from '../../components/tabs/tabs';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import MainScreenContent from '../mainScreenContent/mainScreenContent';
import { getLoadedStatus, getOffers } from '../../store/dataProcess/selectors';
import { getCity } from '../../store/appProcess/selectors';

function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const isLoaded = useAppSelector(getLoadedStatus);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${filteredOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
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
