import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from 'components/App/App';
import BoardPage from 'pages/Board/BoardPage';
import HomePage from 'pages/Home/HomePage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import ProjectsPage from 'pages/Projects/ProjectsPage';
import UserPage from 'pages/User/UserPage';
import AuthPage from 'pages/Auth/AuthPage';
import SignupForm from 'components/SignupForm/SignupForm';
import LoginForm from 'components/LoginForm/LoginForm';
import PrivateRoute from './PrivateRoute';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="projects" element={<ProjectsPage />}></Route>
            <Route path="projects/:boardId" element={<BoardPage />} />
            <Route path="user" element={<UserPage />}></Route>
          </Route>
          <Route element={<AuthPage />}>
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
