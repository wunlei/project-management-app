import { useGetAllBoardsExpandedQuery } from 'redux/api/endpoints/boards';
import { CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';

function ProjectsPage() {
  const { t } = useTranslation();

  const {
    currentData: boards,
    isLoading,
    isSuccess,
  } = useGetAllBoardsExpandedQuery();

  return (
    <Container
      component="main"
      sx={{ flexGrow: 1 }}
      fixed={false}
      maxWidth={false}
    >
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
                onDelete={() => {}}
              ></ProjectCard>
            ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
