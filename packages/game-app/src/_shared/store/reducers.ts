import { name as i18nName, reducer as i18nReducer } from '@pipeline/i18n';
import { name as authName, reducer as authReducer } from '@pipeline/auth';
import { name as requestsStatusName, reducer as requestsStatusReducer } from '@pipeline/requests-status';

const reducers = {
  [i18nName]: i18nReducer,
  [authName]: authReducer,
  [requestsStatusName]: requestsStatusReducer,
};

export default reducers;
