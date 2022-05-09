import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import ProjectCard from 'components/ProjectCard/ProjectCard';

function ProjectsPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container component="main" sx={{ flexGrow: 1 }}>
        <Stack spacing={3}>
          <Typography variant="h2" fontWeight="bold">
            Projects
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              id="search-input"
              label="Search"
              variant="outlined"
              type="text"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                maxWidth: '300px',
                width: '100%',
              }}
            />
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              sx={{ lineHeight: '3em' }}
            >
              Search
            </Button>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '1rem',
              rowGap: '1rem',
            }}
          >
            <ProjectCard color={'pink'} title={'My Project #1'}></ProjectCard>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
