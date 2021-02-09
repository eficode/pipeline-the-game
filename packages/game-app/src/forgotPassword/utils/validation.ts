import * as yup from 'yup';

const requiredError = 'general.errors.required';

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required(requiredError)
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), 'auth.errors.passwordRequirements'),
  repeatPassword: yup
    .string()
    .required(requiredError)
    .oneOf([yup.ref('password')], 'auth.errors.passwordMatch'),
});
