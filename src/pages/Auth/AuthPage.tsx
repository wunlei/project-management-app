import { useEffect } from 'react';
import { useAppSelector } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Stack, Link, Typography, Button } from '@mui/material';
import Footer from 'components/Footer/Footer';
import LangMenu from 'components/LangMenu/LangMenu';
import { team } from 'constants/appConstants';
import bg from 'assets/img/towfiqu-barbhuiya-jOeh3Lv88xA-unsplash.jpg';

function AuthPage() {
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector((state) => state.global.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        bgcolor="white"
        flex={1}
        justifyContent="space-between"
        width="100%"
        sx={{
          zIndex: 1,
          width: {
            md: '700px',
          },
        }}
      >
        <Stack justifyContent="space-between" direction="row" padding={1}>
          <Button component={RouterLink} to="/" variant="outlined">
            {t('Back')}
          </Button>
          <LangMenu />
        </Stack>
        <Stack alignItems="center">
          <Outlet />
        </Stack>
        <Footer data={team} />
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
