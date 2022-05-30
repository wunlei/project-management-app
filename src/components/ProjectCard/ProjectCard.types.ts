export interface ProjectCardData {
  title: string;
  description: string;
  boardId: string;
}

export interface ProjectCardProps extends ProjectCardData {
  onDelete: (boardId: string) => void;
  onEdit: ({ title, description, boardId }: ProjectCardData) => void;
}
