import { useMatch } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import { ReactComponent as RsLogo } from 'assets/icons/rs-logo.svg';
import { FooterProps } from './Footer.types';

function Footer({ data }: FooterProps) {
  const isOnBoard = useMatch('/projects/:id');
  return (
    <Stack
      component="footer"
      justifyContent="space-between"
      alignItems="center"
      rowGap={2}
      padding={'0.75rem 1rem'}
      sx={{
        position: isOnBoard ? 'fixed' : 'unset',
        bottom: isOnBoard ? 0 : 'unset',
        left: isOnBoard ? 0 : 'unset',
        backgroundColor: 'white',
        width: '100%',
        flexDirection: {
          sm: 'row',
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Link
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RsLogo />
        </Link>
        <Typography variant="body1">© 2022</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        {data.map((el) => (
          <Link
            key={el.name}
            href={el.url}
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            {el.name}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}

export default Footer;
