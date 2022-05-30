import { ProjectCardData } from 'components/ProjectCard/ProjectCard.types';

export interface EditProjectFormProps {
  open: boolean;
  projectData: ProjectCardData | null;
  onClose: () => void;
}
