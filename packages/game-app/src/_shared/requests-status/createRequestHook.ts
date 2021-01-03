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

/**
 * Hook factory that handles all the request management and error translation for you.
 *
 * @example
 * ```typescript
 * // generate the hook
 * const useSignup = createGeneralHook('signup', actions.executeSignup, {errorMessagesScope:'signup.errors'})
 *
 * // use it in your component
 *
 * const {call, loading, success, translatedError} = useSignup();
 *
 *
 * return (
 *    <button onClick={()=>call()}>signup</button>
 *  );
 *
 * ```
 *
 * Executing the call function will dispatch the action passed to the factory using the data
 * provided and start the flow. Remember to wrap your saga with {@link addRequestStatusManagement}.
 *
 * The error is translated using the {@link translateError}
 *
 * @param requestKey
 * @param triggerAction
 * @param options
 */
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

    const errorMessagesScope = options?.errorMessagesScope;

    const getErrorMessage = useCallback(
      (error: any) => {
        return error ? translateError(t, error, errorMessagesScope) : undefined;
      },
      [t, errorMessagesScope],
    );

    const [translatedError, setTranslatedError] = useState(getErrorMessage(error));

    useEffect(() => {
      const errorText = error ? getErrorMessage(error) : undefined;
      setTranslatedError(errorText);
    }, [error, getErrorMessage]);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, success, error, translatedError, call, reset };
  };

  Object.defineProperty(hook, 'name', {
    value: `use${requestKey}Request`,
    configurable: true,
  });

  return hook;
}
