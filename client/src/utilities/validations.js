import * as yup from 'yup';

const register = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('E-mail is invalid').required('E-mail is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const login = yup.object().shape({
  email: yup.string().email('E-mail is invalid').required('E-mail is required'),
  password: yup.string().required('Password is required'),
});

const category = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 20 characters'),
});

const schemas = {
  register,
  login,
  category,
};

export default schemas;
