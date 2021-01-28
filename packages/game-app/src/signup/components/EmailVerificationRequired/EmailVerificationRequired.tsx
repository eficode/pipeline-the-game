import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { useLogout, useResendVerificationEmail } from '@pipeline/auth';
import { Button, ErrorMessage, Link } from '@pipeline/components';

type Props = {};

const EmailVerificationRequired: React.FC<Props> = () => {
  const t = useTranslate();

  const { call: resendEmail, success, loading, translatedError } = useResendVerificationEmail();
  const { call: executeLogout } = useLogout();

  return (
    <div className="content">
      <div className="card text-center">
        <h2>{t('signup.verificationRequired.message')}</h2>
        <Button label={t('signup.verificationRequired.resend')} disabled={loading} onClick={resendEmail} />
        &nbsp;
        <Link onClick={executeLogout}>{t('auth.logout')}</Link>
        {success ? t('signup.verificationRequired.resendSuccess') : null}
        {translatedError ? <ErrorMessage message={translatedError} /> : null}
      </div>
    </div>
  );
};

EmailVerificationRequired.displayName = 'EmailVerificationRequired';

export default EmailVerificationRequired;
