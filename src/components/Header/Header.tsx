import React from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'assets/icons/chevron-down.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/log-out.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import HideOnScroll from './HideOnScroll';

function Header() {
  const location = useLocation();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currLang, setCurrLang] = useState<string>('EN');

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLang = (lang: string) => {
    setCurrLang(lang);
    handleClose();
  };

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
            <div>
              <Button
                id="lang-menu-button"
                aria-controls={open ? 'lang-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ArrowIcon />}
              >
                {currLang}
              </Button>
              <Menu
                id="lang-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lang-menu-button',
                }}
                elevation={3}
              >
                <MenuItem
                  onClick={() => {
                    getLang('EN');
                  }}
                >
                  EN
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getLang('RU');
                  }}
                >
                  RU
                </MenuItem>
              </Menu>
            </div>
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
