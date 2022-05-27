import { useState } from 'react';
import { useGetAllBoardsQuery } from 'redux/api/endpoints/boards';
import { BoardFromServer } from 'redux/api/apiTypes';
import SearchBar from 'components/SearchBar/SearchBar';
import { useTranslation } from 'react-i18next';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import useProjectDelete from './useProjectDelete';

function ProjectsPage() {
  const { t } = useTranslation();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string | null>(null);

  const { currentData: boards, isError } = useGetAllBoardsQuery();

  const handleConfirmationInit = (boardId: string) => {
    setBoardId(boardId);
    setIsConfirmationOpen(true);
  };

  const handleSuccessfulDelete = () => {
    setIsConfirmationOpen(false);
  };

  const { handleDelete, deleteBoardResult } = useProjectDelete({
    boardId,
    handleSuccessfulDelete,
  });

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
