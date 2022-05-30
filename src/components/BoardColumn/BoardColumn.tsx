import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { BoardColumnProps } from './BoardColumn.types';
import TitleEditor from 'components/BoardColumn/TitleEditor/TitleEditor';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import grey from '@mui/material/colors/grey';
import scrollStyle from 'styles/scrollStyle';

function BoardColumn({
  children,
  columnData,
  setIsColumnDeleteConfirmOpen: setIsConfirmationOpen,
  handleSelectColumnId,
  handleCreateTaskModalOpen,
}: BoardColumnProps) {
  const {
    body: { title },
    columnId,
  } = columnData;

  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleTitleEdit = () => {
    setIsEditMode(!isEditMode);
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
        {isEditMode ? (
          <TitleEditor handleClose={handleTitleEdit} columnData={columnData} />
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
                handleSelectColumnId(columnId);
                handleCreateTaskModalOpen();
              }}
            >
              <PlusIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
            onClick={() => {
              handleSelectColumnId(columnId);
              setIsConfirmationOpen();
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
  );
}

export default BoardColumn;
