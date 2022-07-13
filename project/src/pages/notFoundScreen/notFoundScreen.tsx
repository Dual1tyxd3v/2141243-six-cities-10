import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404 - Page not found.</b>
              <Link to="/" className="favorites__status-description" title="/">Back to main.</Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
export default NotFoundScreen;
