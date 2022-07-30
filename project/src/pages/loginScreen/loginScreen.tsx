import Header from '../../components/header/header';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { loginAction } from '../../store/api-actions';

function LoginScreen(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const {authorizationStatus} = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passRef.current.value
      }));
    }
  };
  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
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
              <a className="locations__item-link" href="/login">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
