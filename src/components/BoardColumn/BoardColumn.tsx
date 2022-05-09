import { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { BoardColumnProps } from './BoardColumn.types';

function BoardColumn(props: BoardColumnProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        sx={{
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
          backgroundColor: '#efefef',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Column Title
        </Typography>
        <div>
          <IconButton
            id="menu-button"
            aria-controls={open ? 'column-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="column-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}
          >
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </Stack>
      <Stack
        padding={1}
        spacing={1}
        alignItems="center"
        width="280px"
        paddingBottom="1rem"
        sx={{
          backgroundColor: '#efefef',
          overflowX: 'hidden',
          overflowY: 'auto',
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          minHeight: '2rem',
        }}
      >
        {props.children}
      </Stack>
    </Stack>
  );
}

export default BoardColumn;
