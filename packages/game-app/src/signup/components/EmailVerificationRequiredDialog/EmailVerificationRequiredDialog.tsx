import React from 'react';
import { useTranslate } from '@pipeline/i18n';
import { selectors, useLogout, useResendVerificationEmail } from '@pipeline/auth';
import { Box, Button, Dialog, DialogForEmailContainer, ErrorMessage, Link, Typography } from '@pipeline/components';
import { useSelector } from 'react-redux';

type Props = {};

const EmailVerificationRequiredDialog: React.FC<Props> = () => {
  const t = useTranslate();

  const user = useSelector(selectors.getCurrentUser);

  const { call: resendEmail, success, loading, translatedError } = useResendVerificationEmail();
  const { call: executeLogout } = useLogout();

  if (!user) {
    return null;
  }

  return (
    <Dialog
      open={!user.emailVerified}
      DialogContainerComponent={DialogForEmailContainer}
      title={t('signup.verificationRequired.title')}
    >
      <Box maxWidth="400px" mt={3}>
        <Typography>{t('signup.verificationRequired.message', { data: { email: user.email } })}</Typography>
      </Box>
      <Box mt={3} textAlign="center">
        <Button
          id="resend-email-button"
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

EmailVerificationRequiredDialog.displayName = 'EmailVerificationRequiredDialog';

export default EmailVerificationRequiredDialog;
