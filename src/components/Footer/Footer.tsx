import { Link, Stack, Typography } from '@mui/material';
import { ReactComponent as RsLogo } from 'assets/icons/rs-logo.svg';
import { FooterProps } from './Footer.types';

function Footer({ data }: FooterProps) {
  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: '0.75rem 1rem',
        rowGap: '1rem',
        flexDirection: {
          sm: 'row',
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <RsLogo />
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
