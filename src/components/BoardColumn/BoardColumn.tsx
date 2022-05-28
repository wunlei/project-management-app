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

import CreateTaskFormModal from 'components/CreateTaskForm/CreateTaskForm';

import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { BoardColumnProps } from './BoardColumn.types';
import grey from '@mui/material/colors/grey';
import scrollStyle from 'styles/scrollStyle';

function BoardColumn({ children, title, boardId, columnId }: BoardColumnProps) {
  const { t } = useTranslation();

  const [columnMenuAnchorEl, setColumnMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [editMode, isEditMode] = useState<boolean>(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const isColumnMenuOpen = Boolean(columnMenuAnchorEl);

  const handleColumnMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setColumnMenuAnchorEl(null);
  };

  const handleTitleEdit = () => {
    isEditMode(!editMode);
  };

  return (
    <>
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
                  <IconButton color="success" onClick={handleTitleEdit}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleTitleEdit}>
                    <CrossIcon />
                  </IconButton>
                </Stack>
              </Stack>
            ) : (
              <Typography
                variant="h5"
                fontWeight="bold"
                onClick={handleTitleEdit}
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
              <IconButton
                size="small"
                onClick={() => {
                  setIsCreateTaskModalOpen(true);
                }}
              >
                <PlusIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              id="menu-button"
              aria-controls={isColumnMenuOpen ? 'column-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isColumnMenuOpen ? 'true' : undefined}
              onClick={handleColumnMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="column-menu"
              anchorEl={columnMenuAnchorEl}
              open={isColumnMenuOpen}
              onClose={handleColumnMenuClose}
              MenuListProps={{
                'aria-labelledby': 'menu-button',
              }}
            >
              <MenuItem onClick={handleColumnMenuClose}>
                {t('Delete column')}
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack
          padding={1}
          spacing={1}
          alignItems="center"
          paddingBottom="1rem"
          width={'280px'}
          sx={[
            {
              backgroundColor: grey[200],
              overflowX: 'hidden',
              overflowY: 'auto',
              borderBottomLeftRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem',
              minHeight: '2rem',
            },
            ...(Array.isArray(scrollStyle) ? scrollStyle : [scrollStyle]),
          ]}
        >
          {children}
        </Stack>
      </Stack>
      <CreateTaskFormModal
        boardId={boardId}
        columnId={columnId}
        open={isCreateTaskModalOpen}
        handleClose={() => {
          setIsCreateTaskModalOpen(false);
        }}
      />
    </>
  );
}

export default BoardColumn;
