import Header from '../../components/header/header';
import { FormEvent, MouseEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES, EMAIL_REGULAR, PASSWORD_REGULAR } from '../../const';
import { clearErrorAction, loginAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { changeCity, setErrorMessage } from '../../store/app-process/app-process';
import { redirectToRoute } from '../../store/action';

function LoginScreen(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current === null || passRef.current === null) {
      return;
    }
    if (emailRef.current.value.match(EMAIL_REGULAR) && passRef.current.value.match(PASSWORD_REGULAR)) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passRef.current.value
      }));
      return;
    }
    dispatch(setErrorMessage('Invalid email or password(Min: 1 letter and 1 number).'));
    dispatch(clearErrorAction());
  };

  const cities = Object.values(CITIES);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    dispatch(redirectToRoute(AppRoute.Main));
  };
  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="loginTitle">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={emailRef} required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passRef} required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
