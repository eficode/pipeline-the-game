import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout, useResendVerificationEmail } from '@pipeline/auth';
import { Button, Link } from '@pipeline/ui-kit';

type Props = {};

const EmailVerificationRequired: React.FC<Props> = () => {
  const t = useTranslate();

  const { call: resendEmail, success, loading, translatedError } = useResendVerificationEmail();
  const { call: executeLogout } = useLogout();

  return (
    <div className="content">
      <div className="card text-center">
        <h2>{t('signup.verificationRequired.message')}</h2>
        <Button disabled={loading} onClick={resendEmail}>
          {t('signup.verificationRequired.resend')}
        </Button>
        &nbsp;
        <Link onClick={executeLogout}>{t('auth.logout')}</Link>
        {success ? t('signup.verificationRequired.resendSuccess') : null}
        {translatedError ? <span className="error-message">{translatedError}</span> : null}
      </div>
    </div>
  );
};

EmailVerificationRequired.displayName = 'EmailVerificationRequired';

export default EmailVerificationRequired;
