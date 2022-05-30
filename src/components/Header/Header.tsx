import { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setToken, setUserId } from 'redux/global/globalSlice';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Link as MuiLink,
  useScrollTrigger,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LangMenu from 'components/LangMenu/LangMenu';
import CreateProjectForm from 'components/CreateProjectForm/CreateProjectForm';
import HideOnScroll from './HideOnScroll';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/log-out.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/header-menu.svg';

function Header() {
  const { t } = useTranslation();
  const isOnBoard = useMatch('/projects/:id');
  const isProject = useMatch('/projects');
  const isMain = useMatch('/');
  const isProfile = useMatch('/user');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.global.token);

  const theme = useTheme();
  const isMatchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window : undefined,
  });

  const [mobileMenuState, setMobileMenuState] = useState<boolean>(false);

  const toggleMobileMenuState =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setMobileMenuState(open);
    };

  return (
    <HideOnScroll>
      <AppBar
        position={isOnBoard ? 'fixed' : 'sticky'}
        sx={{
          top: isOnBoard ? 0 : 'unset',
          left: isOnBoard ? 0 : 'unset',
          backgroundColor: 'white',
          boxShadow: scrollTrigger ? 3 : 0,
        }}
        elevation={0}
      >
        <CreateProjectForm
          open={isModalOpen}
          onClose={handleModalClose}
        ></CreateProjectForm>
        {isMatchesSm && (
          <Toolbar
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              aria-label="menu"
              onClick={toggleMobileMenuState(true)}
              sx={{
                transform: mobileMenuState ? 'rotate(90deg)' : '',
                transition: 'transform 0.5s',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={handleModalClickOpen}
              sx={{
                display: isProject ? '' : 'none',
              }}
            >
              {t('Create project')}
            </Button>
          </Toolbar>
        )}

        {isMatchesSm ? (
          <Drawer
            anchor={'left'}
            open={mobileMenuState}
            onClose={toggleMobileMenuState(false)}
            sx={{
              textAlign: 'center',
            }}
          >
            <Toolbar
              sx={{
                flexDirection: 'column',
                height: '100%',
                padding: 10,
                justifyContent: 'center',
              }}
            >
              <Stack spacing={1}>
                <MuiLink
                  onClick={toggleMobileMenuState(false)}
                  component={Link}
                  to="/"
                  underline="hover"
                  sx={{
                    fontWeight: isMain ? 'bold' : 'inherit',
                  }}
                >
                  Home
                </MuiLink>
                <MuiLink
                  onClick={toggleMobileMenuState(false)}
                  component={Link}
                  to="/projects"
                  underline="hover"
                  sx={{
                    fontWeight: isProject ? 'bold' : 'inherit',
                    display: token ? '' : 'none',
                  }}
                >
                  Projects
                </MuiLink>
                {!token ? (
                  <>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/signup"
                      onClick={toggleMobileMenuState(false)}
                    >
                      {t('Sign Up')}
                    </Button>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/signin"
                      onClick={toggleMobileMenuState(false)}
                    >
                      {t('Sign In')}
                    </Button>
                  </>
                ) : (
                  <>
                    <MuiLink
                      onClick={toggleMobileMenuState(false)}
                      component={Link}
                      to="/user"
                      underline="hover"
                      sx={{
                        display: token ? '' : 'none',
                        fontWeight: isProfile ? 'bold' : 'inherit',
                      }}
                    >
                      Profile
                    </MuiLink>
                    <MuiLink
                      underline="hover"
                      component={Link}
                      to="/"
                      sx={{
                        display: token ? '' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        toggleMobileMenuState(false);
                        dispatch(setToken(null));
                        dispatch(setUserId(null));
                      }}
                    >
                      Sign Out
                    </MuiLink>
                  </>
                )}
                <LangMenu />
              </Stack>
            </Toolbar>
          </Drawer>
        ) : (
          <Toolbar
            sx={{
              flexDirection: 'row',
              justifyContent: token ? 'space-between' : 'flex-end',
            }}
          >
            <Stack direction="row" spacing={1}>
              <MuiLink
                component={Link}
                to="/"
                underline="hover"
                sx={{
                  fontWeight: isMain ? 'bold' : 'inherit',
                }}
              >
                Home
              </MuiLink>

              <MuiLink
                component={Link}
                to="/projects"
                underline="hover"
                sx={{
                  fontWeight: isProject ? 'bold' : 'inherit',
                  display: token ? '' : 'none',
                }}
              >
                Projects
              </MuiLink>
            </Stack>
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={handleModalClickOpen}
              sx={{
                display: isProject ? '' : 'none',
              }}
            >
              {t('Create project')}
            </Button>
            <Stack spacing={1} alignItems="center" direction="row">
              <LangMenu />
              {!token ? (
                <>
                  <Button variant="contained" component={Link} to="/signup">
                    {t('Sign Up')}
                  </Button>
                  <Button variant="outlined" component={Link} to="/signin">
                    {t('Sign In')}
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip title={t('Profile')} arrow>
                    <IconButton
                      color="primary"
                      aria-label="user"
                      component={Link}
                      to="/user"
                    >
                      <UserIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('Sign Out')} arrow>
                    <IconButton
                      color="primary"
                      aria-label="log-out"
                      onClick={() => {
                        dispatch(setToken(null));
                        dispatch(setUserId(null));
                        navigate('/');
                      }}
                    >
                      <ExitIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Toolbar>
        )}
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
