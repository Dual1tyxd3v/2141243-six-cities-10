import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/userProcess/selectors';
import HeaderNavLogged from '../headerNavLogged/headerNavLogged';
import HeaderNavNotLogged from '../headerNavNotLogged/headerNavNotLogged';

function HeaderNav(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.Auth
    ? <HeaderNavLogged />
    : <HeaderNavNotLogged />;
}

export default HeaderNav;
