import { IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { ProjectCardProps } from './ProjectCard.types';

function getShortDescription(text: string) {
  return text.length > 38 ? text.slice(0, 38) + '...' : text;
}

export default function ProjectCard({
  color,
  title,
  description,
}: ProjectCardProps) {
  return (
    <Stack
      padding={2}
      paddingTop={1}
      sx={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: color,
        borderLeftWidth: '7px',
        maxWidth: '300px',
        width: '100%',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <IconButton color="error">
          <TrashIcon />
        </IconButton>
      </Stack>
      <Typography
        variant="body2"
        sx={{
          wordWrap: 'break-word',
        }}
        title={description}
      >
        {getShortDescription(description)}
      </Typography>
    </Stack>
  );
}
