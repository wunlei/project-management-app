import { useTranslation } from 'react-i18next';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Link as MuiLink,
  useScrollTrigger,
} from '@mui/material';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/log-out.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import LangMenu from 'components/LangMenu/LangMenu';
import HideOnScroll from './HideOnScroll';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setToken, setUserId } from 'redux/global/globalSlice';
import { useState } from 'react';
import CreateProjectForm from 'components/CreateProjectForm/CreateProjectForm';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.global.token);

  const isOnBoard = useMatch('/projects/:id');
  const isOnHome = useMatch('/');
  const isOnProjects = useMatch('/projects');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window : undefined,
  });

  return (
    <HideOnScroll>
      <AppBar
        position={isOnBoard ? 'fixed' : 'sticky'}
        sx={{
          top: isOnBoard ? 0 : 'unset',
          left: isOnBoard ? 0 : 'unset',
          backgroundColor: 'white',
          boxShadow: trigger ? 3 : 0,
        }}
        elevation={0}
      >
        <CreateProjectForm
          open={isModalOpen}
          onClose={handleModalClose}
        ></CreateProjectForm>
        <Toolbar
          sx={{
            justifyContent: token ? 'space-between' : 'flex-end',
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
          }}
        >
          {token && (
            <Stack direction="row" spacing={1}>
              <MuiLink
                component={Link}
                to="/"
                underline="hover"
                sx={{
                  fontWeight: isOnHome ? 'bold' : 'inherit',
                }}
              >
                Home
              </MuiLink>
              <MuiLink
                component={Link}
                to="projects"
                underline="hover"
                sx={{
                  fontWeight: isOnProjects ? 'bold' : 'inherit',
                }}
              >
                Projects
              </MuiLink>
            </Stack>
          )}
          {isOnProjects && token ? (
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={handleModalClickOpen}
            >
              {t('Create project')}
            </Button>
          ) : null}
          <Stack direction="row" spacing={1} alignItems="center">
            <LangMenu />
            {!token ? (
              <>
                <Button variant="outlined" component={Link} to="/signin">
                  {t('Sign In')}
                </Button>
                <Button variant="contained" component={Link} to="/signup">
                  {t('Sign Up')}
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
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
