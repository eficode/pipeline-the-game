import { name as i18nName, reducer as i18nReducer } from '@pipeline/i18n';
import { name as authName, reducer as authReducer } from '@pipeline/auth';

const reducers = {
  [i18nName]: i18nReducer,
  [authName]: authReducer,
};

export default reducers;
