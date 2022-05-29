import { Button, Box, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import BoardImg from 'assets/img/board.png';

function HomePage() {
  const { t } = useTranslation();
  return (
    <Container sx={{ flexGrow: 1 }} maxWidth={'md'}>
      <Stack alignItems="center">
        <Typography variant="h1" mt={10} fontWeight={700}>
          {t('Kanban board')}
        </Typography>
        <Typography textAlign="center" mt={4}>
          {t(
            'Visualize and progress your project using cards on a powerful board.'
          )}
        </Typography>
        <Button
          variant="contained"
          sx={{
            textTransform: 'capitalize',
            width: 115,
            mt: 4,
          }}
        >
          {t('Get started')}
        </Button>
        <Box
          component="img"
          src={BoardImg}
          alt="Kanban board"
          sx={{
            boxShadow: '0px 0px 61px 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            height: '100%',
            mt: 5,
          }}
        />
        <Typography variant="h4" mt={4} fontWeight={700}>
          {t('Overview')}
        </Typography>
        <Typography textAlign="center" mt={3}>
          {t(
            'Kanban is a framework that provides visibility to an entire process and is commonly used for agile and DevOps to drive continuous delivery and improvement.'
          )}
        </Typography>
      </Stack>
    </Container>
  );
}

export default HomePage;
