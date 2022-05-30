import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
    h5: {
      fontSize: '1.15rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary: {
      main: '#212121',
      light: '#4d4d4d',
      dark: '#171717',
    },
    error: {
      main: '#A82424',
    },
    secondary: {
      main: '#5BB9FD',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});
