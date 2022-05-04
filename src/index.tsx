import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from 'components/Router/AppRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>
);
