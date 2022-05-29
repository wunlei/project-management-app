import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, Stack, Typography, Tooltip } from '@mui/material';
import { BoardTaskProps } from './BoardTask.types';
import { ReactComponent as DeleteIcon } from 'assets/icons/trash.svg';

function BoardTask(props: BoardTaskProps) {
  const {
    title,
    user,
    task,
    handleOpenDeleteConfirmation,
    handleOpenEditModal,
  } = props;

  const { t } = useTranslation();

  const handleOpenTaskEditModal = () => {
    handleOpenEditModal(task);
  };

  const handleOpenTaskDeleteDialog = () => {
    handleOpenDeleteConfirmation(task);
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
      onClick={handleOpenTaskEditModal}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        padding={1.5}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ overflowWrap: 'anywhere' }}
        >
          {title}
        </Typography>
        <Tooltip title={t('Delete')} arrow>
          <IconButton
            id="menu-button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenTaskDeleteDialog();
            }}
            size="small"
          >
            <DeleteIcon style={{ width: '18px', height: '18px' }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        spacing={1}
        padding={1.5}
        paddingTop={0}
      >
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
