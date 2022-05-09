import { useState } from 'react';
import {
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { ReactComponent as ClipIcon } from 'assets/icons/paperclip.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { BoardTaskProps } from './BoardTask.types';

function BoardTask({ title, description, isDone, user }: BoardTaskProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      spacing={0}
      padding={1.5}
      borderRadius={1}
      bgcolor="#ffffff"
      sx={{
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
      }}
      width="250px"
      margin="5px"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* fix colors contrast */}
        <Chip
          label={isDone ? 'Done' : 'Not Done'}
          color={isDone ? 'success' : 'warning'}
          size="small"
          sx={{
            fontSize: '0.875rem',
          }}
        />
        <div>
          <IconButton
            id="menu-button"
            aria-controls={open ? 'card-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="card-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}
          >
            <MenuItem onClick={handleClose}>Open</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </Stack>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ClipIcon width="20px" height="20px" />
        <Avatar sx={{ bgcolor: 'orange', width: '30px', height: '30px' }}>
          {user}
        </Avatar>
      </Stack>
    </Stack>
  );
}

export default BoardTask;
