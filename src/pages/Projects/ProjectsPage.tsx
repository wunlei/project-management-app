import { Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';
import { useGetAllBoardsExpandedQuery } from 'redux/api/endpoints/boards';

function ProjectsPage() {
  const { t } = useTranslation();

  const {
    data: boards,
    isFetching,
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
          {boards &&
            boards.map((el) => (
              <ProjectCard
                key={el.id}
                title={el.title}
                description={'desc'}
                boardId={el.id}
                onDelete={() => {}}
              ></ProjectCard>
            ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
