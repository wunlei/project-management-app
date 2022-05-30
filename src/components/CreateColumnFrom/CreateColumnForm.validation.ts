import * as yup from 'yup';

export const CreateFormSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(30, 'Title must be at most 30 characters'),
});
