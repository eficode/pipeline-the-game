import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import { Box, Button, ErrorMessage, Link, TowColumnPage, Typography } from '@pipeline/components';
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

  const {
    call: sendResetPasswordEmail,
    translatedError: sendTranslateError,
    loading: sendLoading,
  } = useSendResetPasswordEmail();

  const submit = useMemo(() => {
    return handleSubmit((info: { email: string }) => {
      sendResetPasswordEmail(info.email);
    });
  }, [sendResetPasswordEmail, handleSubmit]);

  const location = useLocation<{ desiredUrl: string }>();
  const goToSignIn = useNavigateTo(RoutingPath.Login, location.state);

  return (
    <TowColumnPage
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
                />
                <Box textAlign="center" mt={5}>
                  <Button
                    type="submit"
                    label={t('forgotPassword.form.buttonText')}
                    loading={sendLoading}
                    onClick={submit}
                  />
                </Box>
                {sendTranslateError ? <ErrorMessage message={sendTranslateError} /> : null}
                <Box mt={4} textAlign="center">
                  <span>{t('forgotPassword.backTo')}</span>&nbsp;
                  <Link onClick={goToSignIn}>{t('forgotPassword.backToLink')}</Link>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </>
      }
    />
  );
};

ForgotPassword.displayName = 'Login';

export default ForgotPassword;
