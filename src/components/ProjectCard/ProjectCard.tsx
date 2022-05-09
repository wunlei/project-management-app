import { Card, CardHeader, IconButton, Typography } from '@mui/material';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { ProjectCardProps } from './ProjectCard.types';

export default function ProjectCard({ color, title }: ProjectCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: color,
        borderLeftWidth: '7px',
        maxWidth: '300px',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
      }}
    >
      <CardHeader
        disableTypography
        title={
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
        }
        action={
          <IconButton color="error">
            <TrashIcon />
          </IconButton>
        }
      ></CardHeader>
    </Card>
  );
}
