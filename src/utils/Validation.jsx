import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const addPostValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().min(10, 'Content must be at least 10 words').required('Content is required'),
  summary: yup.string().min(10, 'Summary must be at least 10 words').required('Summary is required'),
  image: yup.string().required('Image is required'),
});
