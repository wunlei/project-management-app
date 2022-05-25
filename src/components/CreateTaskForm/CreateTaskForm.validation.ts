import { UserFromServer } from 'redux/api/apiTypes';
import * as yup from 'yup';

export const schema = yup.object({
  title: yup
    .string()
    .required('Task title is required')
    .max(30, 'Maximum is 30 symbols'),
  picture: yup
    .mixed<FileList>()
    .nullable()
    .test('fileSize', 'Is too large', (value) => {
      if (value && value[0]) {
        return value[0].size <= 1000000;
      } else {
        return true;
      }
    })
    .test('isIncorrectType', 'You can only pick png/jpg/jpeg', (value) => {
      if (value && value[0]) {
        return value[0].type === 'image/jpeg' || value[0].type === 'image/png';
      } else {
        return true;
      }
    }),
  description: yup.string().ensure().max(500, 'Maximum is 500 symbols'),
  member: yup
    .mixed<UserFromServer>()
    .required('You must pick a member')
    .test('isEmpty', 'You must pick a member', (value) => {
      return !!value && !!value.id && !!value.login && !!value.name;
    }),
});
