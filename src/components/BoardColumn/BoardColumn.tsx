import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { BoardColumnProps } from './BoardColumn.types';
import { grey } from '@mui/material/colors';

function BoardColumn({ children, title }: BoardColumnProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editMode, isEditMode] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    isEditMode(!editMode);
  };

  return (
    <Stack width="280px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        paddingLeft={2}
        sx={{
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
          backgroundColor: grey[200],
        }}
      >
        <div>
          {editMode ? (
            <Stack direction="row" alignItems="center">
              <TextField
                label="Title"
                variant="outlined"
                required
                defaultValue={title}
              />
              <Stack direction="row" height="fit-content">
                <IconButton color="success" onClick={handleEdit}>
                  <CheckIcon />
                </IconButton>
                <IconButton color="error" onClick={handleEdit}>
                  <CrossIcon />
                </IconButton>
              </Stack>
            </Stack>
          ) : (
            <Typography variant="h5" fontWeight="bold" onClick={handleEdit}>
              {title}
            </Typography>
          )}
        </div>
        <div style={{ display: editMode ? 'none' : '' }}>
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
        paddingBottom="1rem"
        sx={{
          backgroundColor: grey[200],
          overflowX: 'hidden',
          overflowY: 'auto',
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          minHeight: '2rem',
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export default BoardColumn;
