import * as yup from 'yup';

const requiredError = 'general.errors.required';
const maxLengthError = 'general.errors.maxLength';

export const createGameValidationSchema = yup.object().shape({
  scenarioContent: yup.string().required(requiredError).max(100, maxLengthError),
  scenarioTitle: yup.string().required(requiredError).max(3000, maxLengthError),
});
