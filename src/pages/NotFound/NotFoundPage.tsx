import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Stack height="100vh" justifyContent="space-between">
      <Stack alignItems="center" spacing={3}>
        <Typography variant="h2" fontSize="3rem" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h3" fontSize="1.5rem">
          Page Not Found
        </Typography>
        <Button
          component={Link}
          to={'/'}
          variant="outlined"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Back to Home
        </Button>
      </Stack>
    </Stack>
  );
}

export default NotFoundPage;
