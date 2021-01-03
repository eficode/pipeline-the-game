import * as yup from 'yup';

const requiredError = 'general.errors.required';

export const signupValidationSchema = yup.object().shape({
  email: yup.string().required(requiredError).email('signup.errors.invalidEmail'),
  password: yup
    .string()
    .required(requiredError)
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), 'signup.errors.passwordRequirements'),
  repeatPassword: yup
    .string()
    .required(requiredError)
    .oneOf([yup.ref('password')], 'signup.errors.passwordMatch'),
  role: yup.string().required(requiredError),
  devOpsMaturity: yup.string().required(requiredError),
});
