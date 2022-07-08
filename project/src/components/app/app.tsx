import MainScreen from '../../pages/mainScreen/mainScreen';

type AppProps = {
  placeNumber: number,
}

function App({placeNumber}: AppProps): JSX.Element {
  return <MainScreen placeNumber={placeNumber}/>;
}

export default App;
