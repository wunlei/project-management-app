import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, Stack, Typography, Tooltip } from '@mui/material';
import { BoardTaskProps } from './BoardTask.types';
import { ReactComponent as DeleteIcon } from 'assets/icons/trash.svg';
import getColorCode from 'utils/getColorCode';

function BoardTask(props: BoardTaskProps) {
  const {
    user,
    task,
    isDragging,
    draggableProps,
    dragHandleProps,
    innerRef,
    handleTaskDeleteConfirmOpen,
    handleTaskEditModalOpen,
  } = props;

  const { title } = task;

  const { t } = useTranslation();

  const avatarColor = getColorCode(user);

  const handleOpenTaskEditModal = () => {
    handleTaskEditModalOpen(task);
  };

  const handleOpenTaskDeleteDialog = () => {
    handleTaskDeleteConfirmOpen(task);
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
        {user && (
          <Avatar
            sx={{
              bgcolor: 'transparent',
              color: 'black',
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: avatarColor,
              // fontWeight: '600',
              width: '30px',
              height: '30px',
              textTransform: 'capitalize',
            }}
          >
            {user[0]}
          </Avatar>
        )}
      </Stack>
    </Stack>
  );
}

export default BoardTask;
