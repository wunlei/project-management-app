import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

function AuthPage() {
  const isLoggedIn = useAppSelector((state) => state.global.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Auth Page
      <Outlet />
    </div>
  );
}

export default AuthPage;
