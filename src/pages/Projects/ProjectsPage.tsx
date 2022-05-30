import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllBoardsExpandedQuery } from 'redux/api/endpoints/boards';
import useProjectDelete from 'hooks/useProjectDelete';
import {
  Backdrop,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import SearchBar from 'components/SearchBar/SearchBar';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import EditProjectForm from 'components/EditProjectForm/EditProjectForm';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import { ProjectCardData } from 'components/ProjectCard/ProjectCard.types';

function ProjectsPage() {
  const { t } = useTranslation();

  const {
    currentData: boards,
    isLoading,
    isSuccess,
  } = useGetAllBoardsExpandedQuery();

  const [boardId, setBoardId] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<ProjectCardData | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleEditModalInit = (project: ProjectCardData) => {
    setProjectData(project);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirmInit = (boardId: string) => {
    setBoardId(boardId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleSuccessfulDelete = () => {
    setBoardId(null);
    setIsDeleteConfirmationOpen(false);
  };

  const { handleDelete, deleteBoardResult } = useProjectDelete({
    boardId,
    handleSuccessfulDelete,
  });

  useEffect(() => {
    if (!isEditModalOpen) {
      setProjectData(null);
    }
  }, [isEditModalOpen]);

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
          setIsDeleteConfirmationOpen(false);
        }}
        onConfirm={handleDelete}
      />
      <EditProjectForm
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        projectData={projectData}
      />
      <Stack spacing={3}>
        <Typography variant="h3" fontWeight="bold" paddingLeft={2}>
          {t('Projects')}
        </Typography>
        <SearchBar boards={boards} />
        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
          {isLoading && <CircularProgress size={80} thickness={5} />}
          {!isSuccess && !isLoading ? (
            <Typography>{t('Something went wrong!')}</Typography>
          ) : null}
          {boards && boards.length === 0 ? (
            <Typography>{t('No projects yet')}</Typography>
          ) : null}
          {boards &&
            boards.map((board) => (
              <ProjectCard
                key={board.id}
                title={board.title}
                description={board.description}
                boardId={board.id}
                onDelete={handleDeleteConfirmInit}
                onEdit={handleEditModalInit}
              />
            ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
