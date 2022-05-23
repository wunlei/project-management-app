import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';

function PrivateRoute() {
  const isLoggedIn = useAppSelector((state) => state.global.token);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
