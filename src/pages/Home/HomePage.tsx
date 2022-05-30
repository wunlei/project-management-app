import {
  Button,
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { team } from 'constants/appConstants';

import DummyTask from 'components/DummyPlaceholders/DummyTask';
import DummyColumn from 'components/DummyPlaceholders/DummyColumn';
import { dummyGreyBG } from 'constants/colors';

function HomePage() {
  const { t } = useTranslation();

  const firstColQueryMatch = useMediaQuery('(max-width: 755px)');
  const secondColQueryMatch = useMediaQuery('(max-width: 1020px)');
  const thirdColQueryMatch = useMediaQuery('(max-width: 1300px)');
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems={firstColQueryMatch ? 'center' : undefined}
        pl={secondColQueryMatch ? (firstColQueryMatch ? 0 : 6) : 2}
        pb={5}
        sx={{
          minHeight: firstColQueryMatch ? '90vh' : '110vh',
          minWidth: firstColQueryMatch ? '100vw' : undefined,
        }}
      >
        <Stack
          maxWidth={510}
          alignItems="center"
          textAlign={firstColQueryMatch ? 'center' : undefined}
        >
          <Typography variant="h1" fontSize={64}>
            {t('Manage your projects easily')}
          </Typography>
          <Typography
            mt={4}
            maxWidth={435}
            sx={{ alignSelf: firstColQueryMatch ? 'center' : 'baseline' }}
          >
            {t(
              'Kanban is a framework that provides visibility to an entire process and is commonly used for agile and DevOps to drive continuous delivery and improvement.'
            )}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              textTransform: 'capitalize',
              width: 250,
              mt: 4,
            }}
          >
            {t('Get started')}
          </Button>
        </Stack>
        <Stack
          spacing={3}
          flexDirection="row"
          sx={{
            columnGap: 2,
            position: 'absolute',
            top: -100,
            right: 6,
            zIndex: -1,
          }}
        >
          <Stack
            spacing={2}
            sx={{ display: firstColQueryMatch ? 'none' : 'flex' }}
          >
            <DummyColumn>
              <DummyTask />
              <DummyTask />
              <DummyTask />
              <DummyTask />
            </DummyColumn>
            <DummyColumn boxShadow="0px 6px 9px -1px rgba(0, 0, 0, 0.17);">
              <DummyTask />
            </DummyColumn>
            <DummyColumn isTitleBlue>
              <DummyTask />
              <DummyTask />
            </DummyColumn>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              display: secondColQueryMatch ? 'none' : 'flex',
            }}
          >
            <DummyColumn>
              <DummyTask />
              <DummyTask />
            </DummyColumn>
            <DummyColumn isTitleBlue>
              <DummyTask />
              <DummyTask isCircleBlue />
              <DummyTask />
            </DummyColumn>
            <DummyColumn>
              <DummyTask />
              <DummyTask />
            </DummyColumn>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              display: thirdColQueryMatch ? 'none' : 'flex',
            }}
          >
            <DummyColumn>
              <DummyTask />
              <DummyTask />
            </DummyColumn>
            <DummyColumn>
              <DummyTask />
              <DummyTask />
              <DummyTask isCircleBlue />
              <DummyTask />
            </DummyColumn>
            <DummyColumn boxShadow="0px 6px 9px -1px rgba(0, 0, 0, 0.116);">
              <DummyTask />
              <DummyTask />
            </DummyColumn>
          </Stack>
        </Stack>
      </Stack>
      <Container sx={{ mt: 6 }}>
        <Stack
          flexDirection="row"
          mt={4}
          mb={3}
          gap={3}
          flexWrap="wrap"
          justifyContent="center"
        >
          {team.map((item, i) => (
            <Stack
              key={i}
              maxWidth={420}
              padding={2}
              spacing={2}
              sx={{
                borderRadius: '15px',
                backgroundColor: dummyGreyBG,
                boxShadow: '0px 6px 9px -1px rgba(0, 0, 0, 0.17);',
              }}
            >
              <Box
                width={120}
                height={15}
                sx={{ borderRadius: '15px', backgroundColor: item.color }}
              />
              <Stack
                direction="row"
                padding={2}
                spacing={2}
                sx={{ borderRadius: '15px', backgroundColor: '#FFF' }}
              >
                <Stack spacing={2}>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Typography>{t(item.text)}</Typography>
                </Stack>
                <Box
                  component="img"
                  src={item.avatar}
                  alt={`${item.name} avatar`}
                  width={88}
                  height={88}
                  sx={{ borderRadius: '50%', alignSelf: 'flex-end' }}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default HomePage;
