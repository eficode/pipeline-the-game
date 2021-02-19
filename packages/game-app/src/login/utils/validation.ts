import * as yup from 'yup';

const requiredError = 'general.errors.required';
const maxLengthError = 'general.errors.maxLength';

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required(requiredError).max(250, maxLengthError).email('auth.errors.invalidEmail'),
  password: yup
    .string()
    .required(requiredError)
    .max(50, maxLengthError)
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), 'auth.errors.passwordRequirements'),
});
