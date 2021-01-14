import * as yup from 'yup';

const requiredError = 'general.errors.required';

export const createGameValidationSchema = yup.object().shape({
  scenarioContent: yup.string().required(requiredError),
  scenarioTitle: yup.string().required(requiredError),
});
