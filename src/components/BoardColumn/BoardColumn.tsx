import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CreateTaskFormModal from 'components/CreateTaskForm/CreateTaskForm';
import TitleEditor from 'components/BoardColumn/TitleEditor/TitleEditor';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import useColumnDelete from 'components/hooks/useColumnDelete';
import { BoardColumnProps } from './BoardColumn.types';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';

function BoardColumn({ children, columnData }: BoardColumnProps) {
  const {
    body: { title },
    boardId,
    columnId,
  } = columnData;

  const { t } = useTranslation();

  const [columnMenuAnchorEl, setColumnMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [editMode, isEditMode] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const isColumnMenuOpen = Boolean(columnMenuAnchorEl);

  const handleSuccessfulDelete = () => {
    setIsConfirmationOpen(false);
  };

  const { handleDelete, deleteColumnResult } = useColumnDelete({
    boardId,
    columnId,
    handleSuccessfulDelete,
  });

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
            opacity: deleteColumnResult.isLoading ? 0.5 : 1,
            pointerEvents: deleteColumnResult.isLoading ? 'none' : 'auto',
          }}
        >
          <div>
            {editMode ? (
              <TitleEditor
                handleClose={handleTitleEdit}
                columnData={columnData}
              />
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
              <MenuItem
                onClick={() => {
                  handleColumnMenuClose();
                  setIsConfirmationOpen(true);
                }}
              >
                {t('Delete column')}
              </MenuItem>
            </Menu>

            <ConfirmationDialog
              open={isConfirmationOpen}
              dialogText={t(
                'You are about to permanently delete column. This action cannot be undone.'
              )}
              title={t('Delete column')}
              onReject={() => {
                setIsConfirmationOpen(false);
              }}
              onConfirm={handleDelete}
            />
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
            opacity: deleteColumnResult.isLoading ? 0.5 : 1,
            pointerEvents: deleteColumnResult.isLoading ? 'none' : 'auto',
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
