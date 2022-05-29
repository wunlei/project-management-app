import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CreateTaskFormModal from 'components/CreateTaskForm/CreateTaskForm';
import TitleEditor from 'components/BoardColumn/TitleEditor/TitleEditor';
import { BoardColumnProps } from './BoardColumn.types';
import grey from '@mui/material/colors/grey';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';

function BoardColumn({
  children,
  columnData,
  setIsConfirmationOpen,
}: BoardColumnProps) {
  const {
    body: { title },
    boardId,
    columnId,
  } = columnData;

  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleTitleEdit = () => {
    setIsEditMode(!isEditMode);
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
          {isEditMode ? (
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
          <Stack
            direction="row"
            alignItems="center"
            style={{ display: isEditMode ? 'none' : '' }}
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
              onClick={() => {
                setIsConfirmationOpen(true);
              }}
            >
              <TrashIcon />
            </IconButton>
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
