import * as yup from 'yup';

const requiredError = 'general.errors.required';

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required(requiredError).email('auth.errors.invalidEmail'),
  password: yup
    .string()
    .required(requiredError)
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), 'auth.errors.passwordRequirements'),
});
