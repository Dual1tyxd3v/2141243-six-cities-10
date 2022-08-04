import { AuthorizationStatus, AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/userProcess/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (authorizationStatus === AuthorizationStatus.NoAuth ) ? <Navigate to={AppRoute.Login} /> : children ;
}
export default PrivateRoute;
