import { Action } from '@reduxjs/toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateError, useTranslate } from '@pipeline/i18n';
import { selectRequestStatus } from './selectors';
import { RequestsKeys } from './requestsKeys';
import { actions as requestsActions } from './index';
import { GeneralHookResponse } from './types';

type HookOptions = {
  errorMessagesScope?: string;
};

export function createRequestHook<T extends Array<any>>(
  requestKey: keyof RequestsKeys,
  triggerAction: (...args: T) => Action,
  options?: HookOptions,
): () => GeneralHookResponse<T> {
  const hook = function useRequest(): GeneralHookResponse<T> {
    const t = useTranslate();
    const dispatch = useDispatch();
    const keySelector = useMemo(() => selectRequestStatus(requestKey), []);

    const { loading, success, error } = useSelector(keySelector);

    const getErrorMessage = (error: any) => {
      return error ? translateError(t, error, options?.errorMessagesScope) : undefined;
    };

    const [translatedError, setTranslatedError] = useState(getErrorMessage(error));

    useEffect(() => {
      const errorText = error ? getErrorMessage(error) : undefined;
      setTranslatedError(errorText);
    }, [error]);

    const call = useCallback(
      (...args: T) => {
        dispatch(triggerAction(...args));
      },
      [dispatch],
    );

    const reset = useCallback(() => {
      dispatch(requestsActions.resetStatus(requestKey));
    }, [dispatch]);

    useEffect(() => {
      return () => {
        dispatch(requestsActions.resetStatus(requestKey));
      };
    }, []);

    return { loading, success, error, translatedError, call, reset };
  };

  Object.defineProperty(hook, 'name', {
    value: `use${requestKey}Request`,
    configurable: true,
  });

  return hook;
}
