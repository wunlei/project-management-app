import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Link as MuiLink,
} from '@mui/material';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/log-out.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import LangMenu from 'components/LangMenu/LangMenu';
import HideOnScroll from './HideOnScroll';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setToken, setUserId } from 'redux/global/globalSlice';

function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.global.token);

  return (
    <HideOnScroll>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white' }}>
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
                  fontWeight: location.pathname === '/' ? 'bold' : 'inherit',
                }}
              >
                Home
              </MuiLink>
              <MuiLink
                component={Link}
                to="projects"
                underline="hover"
                sx={{
                  fontWeight:
                    location.pathname === '/projects' ? 'bold' : 'inherit',
                }}
              >
                Projects
              </MuiLink>
            </Stack>
          )}
          {location.pathname === '/projects' && token ? (
            <Button startIcon={<PlusIcon />} variant="contained">
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
