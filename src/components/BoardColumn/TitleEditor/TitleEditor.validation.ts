import { object, SchemaOf, string } from 'yup';
import { ColumnInputs } from './TitleEditor.types';

export const ColumnTitleSchema: SchemaOf<ColumnInputs> = object({
  title: string()
    .required('Title is required')
    .max(30, 'Title must be at most 30 characters'),
});
