import { Link } from 'react-router-dom';
import { IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ProjectCardProps } from './ProjectCard.types';

export default function ProjectCard({
  title,
  description,
  boardId,
  onDelete,
  onEdit,
}: ProjectCardProps) {
  return (
    <Stack
      padding={2}
      paddingTop={1}
      spacing={1}
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
        minHeight: 150,
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ overflowWrap: 'anywhere' }}
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{
              padding: '2px',
            }}
            onClick={(e) => {
              e.preventDefault();
              onEdit({ title, description, boardId });
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              padding: '2px',
            }}
            color="error"
            onClick={(e) => {
              e.preventDefault();
              onDelete(boardId);
            }}
          >
            <TrashIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
        {description}
      </Typography>
    </Stack>
  );
}
