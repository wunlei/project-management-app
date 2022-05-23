import { UserFromServer } from 'redux/api/apiTypes';
import * as yup from 'yup';
// import { CreateTaskFormValues } from './CreateTaskForm.types';

// type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const schema = yup.object({
  title: yup.string().required('Task title is required'),
  picture: yup
    .mixed<FileList>()
    .nullable()
    .test('fileSize', 'Is too large', (value) => {
      if (value && value[0]) {
        return value[0].size <= 1000000;
      } else {
        return true;
      }
    }),
  description: yup.string().ensure(),
  member: yup
    .mixed<UserFromServer>()
    .required('You must pick a member')
    .test('isEmpty', 'You must pick a member', (value) => {
      return !!value && !!value.id && !!value.login && !!value.name;
    }),
});
