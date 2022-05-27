import { UserFromServer } from 'redux/api/apiTypes';
import * as yup from 'yup';

export const schema = yup.object({
  title: yup
    .string()
    .required('Task title is required')
    .max(30, 'Task title must be at most 30 characters'),
  description: yup
    .string()
    .ensure()
    .max(500, 'Task description must be at most 500 characters'),
  member: yup
    .mixed<UserFromServer>()
    .required('You must pick a member')
    .test('isEmpty', 'You must pick a member', (value) => {
      return !!value && !!value.id && !!value.login && !!value.name;
    }),
});
