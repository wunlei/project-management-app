import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    h1: {
      fontSize: '2em',
    },
    h2: {
      fontSize: '1.75em',
    },
    h3: {
      fontSize: '1.5em',
    },
    h4: {
      fontSize: '1.25em',
    },
    h5: {
      fontSize: '1.15em',
    },
    h6: {
      fontSize: '1em',
    },
  },
  palette: {
    primary: {
      main: '#212121',
      light: '#4d4d4d',
      dark: '#171717',
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
  },
});
