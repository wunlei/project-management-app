export interface ProjectCardProps {
  title: string;
  description: string;
  boardId: string;
  onDelete: (boardId: string) => void;
}
