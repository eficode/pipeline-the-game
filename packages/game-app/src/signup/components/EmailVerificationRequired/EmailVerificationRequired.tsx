import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout, useResendVerificationEmail } from '@pipeline/auth';

type Props = {};

const EmailVerificationRequired: React.FC<Props> = () => {
  const t = useTranslate();

  const { call: resendEmail, success, loading, translatedError } = useResendVerificationEmail();
  const { call: executeLogout } = useLogout();

  return (
    <div className="content">
      <div className="card text-center">
        <h2>{t('signup.verificationRequired.message')}</h2>
        <button type="button" className="primary" disabled={loading} onClick={resendEmail}>
          {t('signup.verificationRequired.resend')}
        </button>
        &nbsp;
        <button type="button" className="link" onClick={executeLogout}>
          {t('auth.logout')}
        </button>
        {success ? t('signup.verificationRequired.resendSuccess') : null}
        {translatedError ? <span className="error-message">{translatedError}</span> : null}
      </div>
    </div>
  );
};

EmailVerificationRequired.displayName = 'EmailVerificationRequired';

export default EmailVerificationRequired;
