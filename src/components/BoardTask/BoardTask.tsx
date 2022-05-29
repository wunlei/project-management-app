import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { ReactComponent as ClipIcon } from 'assets/icons/paperclip.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { BoardTaskProps } from './BoardTask.types';
import grey from '@mui/material/colors/grey';

function BoardTask({
  task: { title, userId },
  draggableProps,
  dragHandleProps,
  innerRef,
  isDragging,
}: BoardTaskProps) {
  // ... 'done' prop doesn't exist in the BE
  const isDone = true;
  // ...

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
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      bgcolor="white"
      borderRadius={1}
      sx={{
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
        boxShadow: isDragging ? 2 : 'unset',
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
            <SvgIcon sx={{ color: 'success.main' }}>
              <CheckIcon />
            </SvgIcon>
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
        alignItems="flex-end"
        justifyContent={hasFile ? 'space-between' : 'flex-end'}
        spacing={1}
        padding={1.5}
        paddingTop={0}
      >
        {hasFile && (
          <SvgIcon
            sx={{
              width: 20,
              height: 20,
              color: grey[700],
            }}
          >
            <ClipIcon />
          </SvgIcon>
        )}
        <Avatar
          sx={{ bgcolor: 'secondary.main', width: '30px', height: '30px' }}
        >
          {userId}
        </Avatar>
      </Stack>
    </Stack>
  );
}

export default BoardTask;
