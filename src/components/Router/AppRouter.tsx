import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from 'components/App/App';
import LoginPage from 'pages/Auth/Login/LoginPage';
import SignupPage from 'pages/Auth/Signup/SignupPage';
import BoardPage from 'pages/Board/BoardPage';
import HomePage from 'pages/Home/HomePage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import ProjectsPage from 'pages/Projects/ProjectsPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="projects" element={<ProjectsPage />}></Route>
          <Route path="projects/:boardId" element={<BoardPage />} />
          <Route path="auth">
            <Route index element={<SignupPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
