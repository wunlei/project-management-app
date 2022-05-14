import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { BoardColumnProps } from './BoardColumn.types';
import grey from '@mui/material/colors/grey';

function BoardColumn({ children, title }: BoardColumnProps) {
  const { t } = useTranslation();

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
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        paddingLeft={2}
        maxWidth="280px"
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
                label={t('Title')}
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
            <Typography
              variant="h5"
              fontWeight="bold"
              onClick={handleEdit}
              sx={{ overflowWrap: 'anywhere' }}
            >
              {title}
            </Typography>
          )}
        </div>
        <Stack
          direction="row"
          alignItems="center"
          style={{ display: editMode ? 'none' : '' }}
        >
          <Tooltip title={t('Add Task')} arrow>
            <IconButton size="small">
              <PlusIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
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
            <MenuItem onClick={handleClose}>{t('Delete column')}</MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <Stack
        padding={1}
        spacing={1}
        alignItems="center"
        paddingBottom="1rem"
        width={'280px'}
        sx={{
          backgroundColor: grey[200],
          overflowX: 'hidden',
          overflowY: 'auto',
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          minHeight: '2rem',
          scrollbarColor: `${grey[400]} ${grey[200]}`,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: grey[200],
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: grey[400],
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export default BoardColumn;
