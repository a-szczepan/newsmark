import { UserFormData } from '../types/user';
import * as Yup from 'yup';

export const FormValidationSchema: Yup.ObjectSchema<UserFormData> =
  Yup.object().shape({
    email: Yup.string()
      .required('This field is required')
      .email('This email is not correct'),
    password: Yup.string()
      .required('This field is required')
      .min(8, 'Password is too short - should have minimum 8 characters.')
  });
