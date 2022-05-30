import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h2" fontSize="3rem" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h3" fontSize="1.5rem">
        {t('Page Not Found')}
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
        {t('Back to Home')}
      </Button>
    </Stack>
  );
}

export default NotFoundPage;
