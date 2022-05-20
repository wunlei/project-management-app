import { object, SchemaOf, string } from 'yup';

export interface UserInputs {
  name: string;
  login: string;
  password: string;
}

export const userValidationSchema: SchemaOf<UserInputs> = object({
  name: string()
    .trim()
    .required('Name is required')
    .matches(
      /^[A-ZА-ЯҐЄІЇҐЄІЇЎа-яґєіїґєіїў .-]+$/im,
      'Name must include only letters or punctuation marks'
    )
    .max(30, 'Name must be at most 30 characters'),
  login: string()
    .trim()
    .required('Login is required')
    .matches(
      /^[a-z0-9]+$/gim,
      'Login must include only latin letters and digits'
    )
    .min(3, 'Login should be at least 3 characters')
    .max(30, 'Login must be at most 30 characters'),
  password: string()
    .required('Password is required')
    .matches(
      /^[a-z0-9]+$/gim,
      'Password must include only latin letters and digits'
    )
    .min(8, 'Password should be at least 8 characters')
    .matches(/[a-z]+/i, 'Password must include at list one letter')
    .matches(/[\d]+/, 'Password must include at list one digit'),
});
