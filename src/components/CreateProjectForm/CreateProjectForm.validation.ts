import { object, SchemaOf, string } from 'yup';

export interface ProjectInputs {
  title: string;
  description?: string;
}

export const ProjectSchema: SchemaOf<ProjectInputs> = object({
  title: string()
    .trim()
    .required('Title is required')
    .max(30, 'Title must be at most 30 characters'),
  description: string()
    .trim()
    .max(60, 'Description must be at most 60 characters'),
});
