import { name as i18nName, reducer as i18nReducer } from '@pipeline/i18n';
import { name as authName, reducer as authReducer } from '@pipeline/auth';
import { name as requestsStatusName, reducer as requestsStatusReducer } from '@pipeline/requests-status';
import { name as dynamicDataName, reducer as dynamicDataReducer } from '@pipeline/dynamicData';

const reducers = {
  [i18nName]: i18nReducer,
  [authName]: authReducer,
  [requestsStatusName]: requestsStatusReducer,
  [dynamicDataName]: dynamicDataReducer,
};

export default reducers;
