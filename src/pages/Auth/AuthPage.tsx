import { Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <div>
      Auth Page
      <Outlet />
    </div>
  );
}

export default AuthPage;
