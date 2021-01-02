import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useResendVerificationEmail } from '@pipeline/auth';

type Props = {};

const EmailVerificationRequired: React.FC<Props> = () => {
  const t = useTranslate();

  const { call: resendEmail, success, loading, translatedError } = useResendVerificationEmail();

  return (
    <div>
      {t('signup.verificationRequired.message')}

      <button onClick={resendEmail}>{t('signup.verificationRequired.resend')}</button>
      {success ? t('signup.verificationRequired.resendSuccess') : null}
    </div>
  );
};

EmailVerificationRequired.displayName = 'EmailVerificationRequired';

export default EmailVerificationRequired;