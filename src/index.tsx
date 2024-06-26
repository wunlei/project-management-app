import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from 'components/Router/AppRouter';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';
import './localization/localization.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  </ThemeProvider>
);
