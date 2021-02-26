import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import {
  Box,
  Button,
  Dialog,
  ErrorMessage,
  Link,
  TwoColumnPage,
  Typography,
  DialogForEmailContainer,
} from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useSendResetPasswordEmail } from '@pipeline/auth';
import { useLocation } from 'react-router-dom';
import { RoutingPath, useNavigateTo } from '@pipeline/routing';

type Props = {};

const ForgotPassword: React.FC<Props> = () => {
  const t = useTranslate();

  const methods = useForm<{ email: string }>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit } = methods;

  const email = methods.watch('email');

  const {
    call: sendResetPasswordEmail,
    translatedError: sendTranslateError,
    loading: sendLoading,
    success: sendSuccess,
  } = useSendResetPasswordEmail();

  const submit = useMemo(() => {
    return handleSubmit((info: { email: string }) => {
      sendResetPasswordEmail(info.email);
    });
  }, [sendResetPasswordEmail, handleSubmit]);

  const location = useLocation<{ desiredUrl: string }>();
  const goToSignIn = useNavigateTo(RoutingPath.Login, location.state);

  return (
    <>
      <TwoColumnPage
        left={
          <>
            <Typography variant="title">{t('forgotPassword.title')}</Typography>
            <Box mt={5}>
              <Typography variant="content">{t('forgotPassword.subTitle')}</Typography>
            </Box>
            <Box mt={5}>
              <FormProvider {...methods}>
                <form onSubmit={submit}>
                  <FormTextField
                    name="email"
                    label={t('forgotPassword.form.email.label')}
                    placeholder={t('forgotPassword.form.email.placeholder')}
                    autoComplete="email"
                  />
                  <Box textAlign="center" mt={5}>
                    <Button
                      id="send-forgot-password"
                      type="submit"
                      label={t('forgotPassword.form.buttonText')}
                      loading={sendLoading}
                      onClick={submit}
                    />
                  </Box>
                  {sendTranslateError ? <ErrorMessage message={sendTranslateError} /> : null}
                  <Box mt={4} textAlign="center">
                    <Typography variant="content" as="span">
                      {t('forgotPassword.backTo')}
                    </Typography>
                    <Link onClick={goToSignIn}>{t('forgotPassword.backToLink')}</Link>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </>
        }
      />
      <Dialog
        open={sendSuccess}
        DialogContainerComponent={DialogForEmailContainer}
        title={t('forgotPassword.success.title')}
      >
        <Typography textAlign="center" mt={3}>
          {t('forgotPassword.success.message', { data: { email: email } })}
        </Typography>
        <Box mt={6} textAlign="center">
          <Button label={t('forgotPassword.success.resend')} onClick={submit} />
        </Box>
        <Box mt={4} textAlign="center">
          <Typography variant="content" as="span">
            {t('general.goTo')}
          </Typography>
          <Link onClick={goToSignIn}>{t('forgotPassword.backToLink')}</Link>
        </Box>
      </Dialog>
    </>
  );
};

ForgotPassword.displayName = 'ForgotPassword';

export default ForgotPassword;
