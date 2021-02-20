import * as yup from 'yup';

const requiredError = 'general.errors.required';
const maxLengthError = 'general.errors.maxLength';

export const resetPasswordValidationSchema = yup.object().shape({
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
});
