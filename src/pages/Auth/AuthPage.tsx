import { Outlet } from 'react-router-dom';
import { Stack, Link, Typography } from '@mui/material';
import bg from 'assets/img/towfiqu-barbhuiya-jOeh3Lv88xA-unsplash.jpg';

function AuthPage() {
  return (
    <Stack
      height="100vh"
      sx={{
        position: 'relative',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack
        component="main"
        bgcolor="white"
        flex={1}
        alignItems="center"
        justifyContent="center"
        width="100%"
        sx={{
          zIndex: 1,
          width: {
            md: '700px',
          },
        }}
      >
        <Outlet />
      </Stack>
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          right: '0.5rem',
          bottom: '0.5rem',
        }}
      >
        Photo by{' '}
        <Link
          href="https://unsplash.com/@towfiqu999999"
          target="_blank"
          rel="noopener noreferrer"
        >
          Towfiqu barbhuiya
        </Link>
      </Typography>
    </Stack>
  );
}

export default AuthPage;
