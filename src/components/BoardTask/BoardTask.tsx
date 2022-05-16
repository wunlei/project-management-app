import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const hasFile = true;
  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isTaskMenuOpen = Boolean(taskMenuAnchorEl);

  const handleTaskMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTaskMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setTaskMenuAnchorEl(null);
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
            <Box width="34px" height="34px" color="success.main">
              <CheckIcon />
            </Box>
          )}
        </Stack>
        <div>
          <IconButton
            id="menu-button"
            aria-controls={isTaskMenuOpen ? 'card-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isTaskMenuOpen ? 'true' : undefined}
            onClick={handleTaskMenuClick}
          >
            <MenuIcon style={{ width: '18px', height: '18px' }} />
          </IconButton>
          <Menu
            id="card-menu"
            anchorEl={taskMenuAnchorEl}
            open={isTaskMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}
          >
            <MenuItem onClick={handleClose}>{t('Open')}</MenuItem>
            <MenuItem onClick={handleClose}>{t('Edit')}</MenuItem>
            <MenuItem onClick={handleClose}>{t('Delete')}</MenuItem>
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
        {hasFile && <ClipIcon width="20px" height="20px" />}
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