import { Link } from 'react-router-dom';
import { IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { ProjectCardProps } from './ProjectCard.types';

export default function ProjectCard({
  title,
  description,
  boardId,
  onDelete,
}: ProjectCardProps) {
  return (
    <Stack
      padding={2}
      paddingTop={1}
      component={Link}
      to={boardId}
      color={'inherit'}
      sx={{
        textDecoration: 'none',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'secondary.main',
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
        <IconButton
          color="error"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          <TrashIcon />
        </IconButton>
      </Stack>
      <Typography
        variant="body2"
        sx={{
          wordWrap: 'break-word',
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
}
