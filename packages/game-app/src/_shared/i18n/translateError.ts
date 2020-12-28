import { useTranslate } from './useTranslate';

const defaultError = 'errors.general';

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
