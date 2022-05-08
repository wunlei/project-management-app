import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
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
          fontSize: '1rem',
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
