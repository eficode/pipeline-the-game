import * as yup from 'yup';

const requiredError = 'general.errors.required';
const maxLengthError = 'general.errors.maxLength';

export const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required(requiredError).max(100, maxLengthError),
  lastName: yup.string().required(requiredError).max(100, maxLengthError),
  email: yup.string().required(requiredError).email('auth.errors.invalidEmail').max(250, maxLengthError),
  password: yup
    .string()
    .required(requiredError)
    .max(50, maxLengthError)
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), 'auth.errors.passwordRequirements'),
  repeatPassword: yup
    .string()
    .required(requiredError)
    .max(50, maxLengthError)
    .oneOf([yup.ref('password')], 'auth.errors.passwordMatch'),
  role: yup.string().required(requiredError),
  devOpsMaturity: yup.string().required(requiredError),
});
