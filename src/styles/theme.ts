import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});
