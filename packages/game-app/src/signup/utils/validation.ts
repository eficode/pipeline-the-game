import * as yup from 'yup';

const requiredError = 'general.errors.required';

export const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required(requiredError),
  lastName: yup.string().required(requiredError),
  email: yup.string().required(requiredError).email('auth.errors.invalidEmail'),
  password: yup
    .string()
    .required(requiredError)
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), 'auth.errors.passwordRequirements'),
  repeatPassword: yup
    .string()
    .required(requiredError)
    .oneOf([yup.ref('password')], 'auth.errors.passwordMatch'),
  role: yup.string().required(requiredError),
  devOpsMaturity: yup.string().required(requiredError),
});
