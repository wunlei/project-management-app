import { Box, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';

function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <Container component="main" sx={{ flexGrow: 1 }}>
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
          <ProjectCard
            title={'My Project #1'}
            description={'Project description'}
            boardId={'1'}
          ></ProjectCard>
        </Box>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
