import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';
import {
  useDeleteBoardMutation,
  useGetAllBoardsQuery,
} from 'redux/api/endpoints/boards';
import { BoardFromServer } from 'redux/api/apiTypes';
import { useEffect, useState } from 'react';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';

function ProjectsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { currentData: boards, isError } = useGetAllBoardsQuery();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string | null>(null);

  const [deleteBoard, deleteBoardResult] = useDeleteBoardMutation();

  const handleConfirmationInit = (boardId: string) => {
    setBoardId(boardId);
    setIsConfirmationOpen(true);
  };

  const handleDelete = () => {
    if (boardId) {
      deleteBoard({ boardId });
      setIsConfirmationOpen(false);
    }
  };

  useEffect(() => {
    if (deleteBoardResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Project successfully deleted',
          alertType: 'success',
        })
      );
    }
    if (deleteBoardResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteBoardResult.isSuccess, deleteBoardResult.isError]);

  return (
    <Container
      component="main"
      sx={{ flexGrow: 1 }}
      fixed={false}
      maxWidth={false}
    >
      <Backdrop
        sx={{
          zIndex: 2000,
        }}
        open={deleteBoardResult.isLoading}
      >
        <CircularProgress color="secondary" size={100} />
      </Backdrop>

      <ConfirmationDialog
        open={isConfirmationOpen}
        dialogText={t(
          'You are about to permanently delete project. This action cannot be undone.'
        )}
        title={t('Delete project')}
        onReject={() => {
          setIsConfirmationOpen(false);
        }}
        onConfirm={handleDelete}
      />
      <Stack spacing={3}>
        <Typography variant="h3" fontWeight="bold">
          {t('Projects')}
        </Typography>
        <SearchBar />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '1rem',
            rowGap: '1rem',
          }}
        >
          {boards &&
            boards.map((el: BoardFromServer) => (
              <ProjectCard
                key={el.id}
                title={el.title}
                description={el.description}
                boardId={el.id}
                onDelete={handleConfirmationInit}
              ></ProjectCard>
            ))}
        </Box>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
