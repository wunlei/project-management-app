import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';

function PrivateRoute() {
  const isLoggedIn = useAppSelector((state) => state.global.userId);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
