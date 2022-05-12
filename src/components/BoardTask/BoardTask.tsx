import { useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { ReactComponent as ClipIcon } from 'assets/icons/paperclip.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { BoardTaskProps } from './BoardTask.types';
import { Box } from '@mui/system';

function BoardTask({ title, description, isDone, user }: BoardTaskProps) {
  const isHasFile = true;
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
      bgcolor="white"
      borderRadius={1}
      sx={{
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
      }}
      width="250px"
      margin="5px"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        padding={1.5}
        paddingRight={1}
      >
        <Stack direction="row" spacing={1}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ overflowWrap: 'anywhere' }}
          >
            {title}
          </Typography>
          {isDone && (
            <Box width="34px" height="34px" color="#2e7d32">
              <CheckIcon />
            </Box>
          )}
        </Stack>
        <div>
          <IconButton
            id="menu-button"
            aria-controls={open ? 'card-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon style={{ width: '18px', height: '18px' }} />
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        padding={1.5}
        paddingTop={0}
      >
        {isHasFile && <ClipIcon width="20px" height="20px" />}
        <Avatar
          sx={{ bgcolor: 'secondary.main', width: '30px', height: '30px' }}
        >
          {user}
        </Avatar>
      </Stack>
    </Stack>
  );
}

export default BoardTask;
