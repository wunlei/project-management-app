import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/log-out.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import LangMenu from 'components/LangMenu/LangMenu';
import HideOnScroll from './HideOnScroll';

function Header() {
  const location = useLocation();
  const [auth, setAuth] = useState(true);

  return (
    <HideOnScroll>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Toolbar
          sx={{
            justifyContent:
              location.pathname === '/projects' ? 'space-between' : 'flex-end',
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
          }}
        >
          {location.pathname === '/projects' && auth ? (
            <Button startIcon={<PlusIcon />} variant="contained">
              Create project
            </Button>
          ) : null}
          <Stack direction="row" spacing={1} alignItems="center">
            <LangMenu />
            {!auth ? (
              <>
                <Button variant="outlined" component={Link} to="/login">
                  Log In
                </Button>
                <Button variant="contained" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Tooltip title="Profile" arrow>
                  <IconButton
                    color="primary"
                    aria-label="user"
                    component={Link}
                    to="/user"
                  >
                    <UserIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sign Out" arrow>
                  <IconButton
                    color="primary"
                    aria-label="log-out"
                    onClick={() => {
                      // log Out and redirect to main
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
