import { Box, Container, Stack, Typography } from '@mui/material';

import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';

function ProjectsPage() {
  return (
    <Stack minHeight="100vh">
      <Container component="main" sx={{ flexGrow: 1 }}>
        <Stack spacing={3}>
          <Typography variant="h3" fontWeight="bold">
            Projects
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
              color={'pink'}
              title={'My Project #1'}
              description={'Project description'}
            ></ProjectCard>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}

export default ProjectsPage;
