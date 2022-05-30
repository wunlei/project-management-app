import {
  Button,
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import { team } from 'constants/appConstants';

import DummyTask from 'components/DummyPlaceholders/DummyTask';
import DummyColumn from 'components/DummyPlaceholders/DummyColumn';
import { dummyGreyBG } from 'constants/colors';
import { Link } from 'react-router-dom';

function HomePage() {
  const isLoggedIn = useAppSelector((state) => state.global.token);
  const { t } = useTranslation();

  const firstColQueryMatch = useMediaQuery('(max-width: 755px)');
  const secondColQueryMatch = useMediaQuery('(max-width: 1020px)');
  const thirdColQueryMatch = useMediaQuery('(max-width: 1300px)');
  return (
    <main>
      <Stack
        justifyContent="center"
        alignItems={firstColQueryMatch ? 'center' : undefined}
        pl={
          secondColQueryMatch ? (firstColQueryMatch ? 0 : 6) : { xl: 15, lg: 2 }
        }
        pb={5}
        sx={{
          minHeight: firstColQueryMatch
            ? '90vh'
            : { xl: '100vh', lg: '110vh', md: '110vh', sm: '110vh' },
          width: firstColQueryMatch ? '100%' : undefined,
        }}
      >
        <Stack
          maxWidth={510}
          alignItems={firstColQueryMatch ? 'center' : 'flex-start'}
          textAlign={firstColQueryMatch ? 'center' : undefined}
        >
          <Typography
            variant="h1"
            fontSize={{ md: '4rem', sm: '3rem', xs: '2rem' }}
          >
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
            component={Link}
            variant="contained"
            color="secondary"
            to={isLoggedIn ? '/projects' : '/signup'}
            sx={{
              textTransform: 'capitalize',
              width: 250,
              mt: 4,
              fontWeight: 700,
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
                borderRadius: 3,
                backgroundColor: dummyGreyBG,
                boxShadow: '0px 6px 9px -1px rgba(0, 0, 0, 0.3);',
              }}
            >
              <Box
                width={120}
                height={15}
                sx={{ borderRadius: 3, backgroundColor: item.color }}
              />
              <Stack
                direction="row"
                padding={2}
                spacing={2}
                sx={{ borderRadius: 3, backgroundColor: 'white', flexGrow: 1 }}
              >
                <Stack spacing={2}>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Typography>{t(item.text)}</Typography>
                </Stack>
                <MuiLink
                  href={item.url}
                  sx={{
                    alignSelf: 'flex-end',
                    '&:hover img': {
                      boxShadow: '0px 6px 9px 2px rgba(0, 0, 0, 0.267)',
                    },
                  }}
                  target={'_blank'}
                >
                  <Box
                    component="img"
                    src={item.avatar}
                    alt={`${item.name} avatar`}
                    width={88}
                    height={88}
                    sx={{ borderRadius: '50%', transition: '0.2s linear' }}
                  />
                </MuiLink>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </main>
  );
}

export default HomePage;
