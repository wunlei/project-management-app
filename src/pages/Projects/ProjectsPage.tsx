import { useEffect, useState } from 'react';
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
import EditProjectForm from 'components/EditProjectForm/EditProjectForm';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import useProjectDelete from '../../hooks/useProjectDelete';
import { ProjectCardData } from 'components/ProjectCard/ProjectCard.types';

function ProjectsPage() {
  const { t } = useTranslation();

  const { currentData: boards, isError } = useGetAllBoardsQuery();

  const [boardId, setBoardId] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<ProjectCardData | null>(null);
  const [isDeleteConfirmationOpen, setIsConfirmationOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleEditModalInit = (project: ProjectCardData) => {
    setProjectData(project);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (!isEditModalOpen) {
      setProjectData(null);
    }
  }, [isEditModalOpen]);

  const handleConfirmationInit = (boardId: string) => {
    setBoardId(boardId);
    setIsConfirmationOpen(true);
  };

  const handleSuccessfulDelete = () => {
    setBoardId(null);
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
        open={isDeleteConfirmationOpen}
        dialogText={t(
          'You are about to permanently delete project. This action cannot be undone.'
        )}
        title={t('Delete project')}
        onReject={() => {
          setIsConfirmationOpen(false);
        }}
        onConfirm={handleDelete}
      />
      <EditProjectForm
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        projectData={projectData}
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
                onEdit={handleEditModalInit}
              />
            ))}
        </Box>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
