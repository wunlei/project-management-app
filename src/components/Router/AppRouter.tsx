import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardPage from 'pages/Board/BoardPage';
import HomePage from 'pages/Home/HomePage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import ProjectsPage from 'pages/Projects/ProjectsPage';
import UserPage from 'pages/User/UserPage';
import AuthPage from 'pages/Auth/AuthPage';
import SignupForm from 'components/SignupForm/SignupForm';
import SigninForm from 'components/SigninForm/SigninForm';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import PrivateRoute from './PrivateRoute';
import { CircularProgress, Backdrop } from '@mui/material';

function AppRouter() {
  const App = React.lazy(() => import('components/App/App'));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Suspense
                fallback={
                  <Backdrop open={true}>
                    <CircularProgress color="secondary" size={100} />
                  </Backdrop>
                }
              >
                <App />
              </Suspense>
            </ErrorBoundary>
          }
        >
          <Route index element={<HomePage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="projects" element={<ProjectsPage />}></Route>
            <Route path="projects/:boardId" element={<BoardPage />} />
            <Route path="user" element={<UserPage />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          element={
            <ErrorBoundary>
              <AuthPage />
            </ErrorBoundary>
          }
        >
          <Route path="signup" element={<SignupForm />} />
          <Route path="signin" element={<SigninForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
