import { useTranslate } from './useTranslate';

const defaultError = 'errors.general';

/**
 *
 * Error translation function that tries to translate the error
 * concatenating scope and error.
 *
 * If the translation is not found it fallbacks to the a general error scope
 * 'errors.general', otherwise returns the message.
 *
 * @param t the translation function
 * @param error error object
 * @param scope optional translation error scope
 */
export default function translateError(
  t: ReturnType<typeof useTranslate>,
  error: { code?: string; errorCode?: string; message?: string },
  scope?: string,
) {
  const errorCode = error.code || error.errorCode;
  let message = t(`${scope || 'errors.code'}.${errorCode}` as any, {
    default: '',
  });

  if (!message) {
    message = t(`errors.code.${errorCode}` as any, {
      default: error.message,
    });
  }

  return message || t(defaultError as any);
}
