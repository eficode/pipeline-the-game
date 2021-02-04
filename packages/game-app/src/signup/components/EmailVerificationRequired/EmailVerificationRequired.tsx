import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { selectors, useLogout, useResendVerificationEmail } from '@pipeline/auth';
import { Box, Button, Dialog, ErrorMessage, Link, Typography } from '@pipeline/components';
import { useSelector } from 'react-redux';

type Props = {};

const EmailVerificationRequired: React.FC<Props> = () => {
  const t = useTranslate();

  const { email } = useSelector(selectors.getCurrentUser)!;

  const { call: resendEmail, success, loading, translatedError } = useResendVerificationEmail();
  const { call: executeLogout } = useLogout();

  return (
    <Dialog open title={t('signup.verificationRequired.title')}>
      <Box maxWidth="400px" mt={3}>
        <Typography>{t('signup.verificationRequired.message', { data: { email } })}</Typography>
      </Box>
      <Box mt={3} textAlign="center">
        <Button
          label={t('signup.verificationRequired.resend')}
          disabled={loading}
          loading={loading}
          onClick={resendEmail}
        />
      </Box>
      <Box mt={3} textAlign="center">
        <Link onClick={executeLogout}>{t('auth.logout')}</Link>
      </Box>
      {success ? t('signup.verificationRequired.resendSuccess') : null}
      {translatedError ? <ErrorMessage message={translatedError} /> : null}
    </Dialog>
  );
};

EmailVerificationRequired.displayName = 'EmailVerificationRequired';

export default EmailVerificationRequired;
