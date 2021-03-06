import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import {
  Box,
  Button,
  Dialog,
  ErrorMessage,
  Link,
  PasswordInput,
  TwoColumnPage,
  Typography,
} from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useLocation } from 'react-router-dom';
import { RoutingPath, useNavigateTo, useQueryParams } from '@pipeline/routing';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordValidationSchema } from '../../utils/validation';
import { LinkUrlParams } from '@pipeline/models';
import { useResetPassword, useVerifyActionCode } from '@pipeline/auth';

type Props = {};

const ResetPassword: React.FC<Props> = () => {
  const params = useQueryParams<LinkUrlParams>();
  const t = useTranslate();

  const methods = useForm<{ password: string; repeatPassword: string }>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const { handleSubmit } = methods;

  const {
    call: resetPassword,
    translatedError: resetTranslateError,
    loading: resetLoading,
    success: resetSuccess,
  } = useResetPassword();

  const {
    call: verifyActionCode,
    translatedError: verifyTranslateError,
    loading: verifyActionCodeLoading,
  } = useVerifyActionCode();

  useEffect(() => {
    verifyActionCode(params.oobCode);
  }, [verifyActionCode, params]);

  const submit = useMemo(() => {
    return handleSubmit((info: { password: string; repeatPassword: string }) => {
      resetPassword({ code: params.oobCode, password: info.password });
    });
  }, [resetPassword, handleSubmit, params]);

  const location = useLocation<{ desiredUrl: string }>();

  const goToLogin = useNavigateTo(RoutingPath.Login, location.state);

  return (
    <>
      <TwoColumnPage
        left={
          <>
            <Typography variant="title">{t('resetPassword.title')}</Typography>
            <Box mt={5}>
              <FormProvider {...methods}>
                <form onSubmit={submit}>
                  <FormTextField
                    CustomInput={PasswordInput}
                    name="password"
                    label={t('resetPassword.form.password.label')}
                    placeholder={t('resetPassword.form.password.placeholder')}
                    labelDetails={t('auth.errors.passwordRequirements')}
                    disabled={resetLoading || verifyActionCodeLoading}
                    autoComplete="new-password"
                  />
                  <Box mt={3}>
                    <FormTextField
                      CustomInput={PasswordInput}
                      name="repeatPassword"
                      label={t('resetPassword.form.repeatPassword.label')}
                      placeholder={t('resetPassword.form.repeatPassword.placeholder')}
                      disabled={resetLoading || verifyActionCodeLoading}
                      autoComplete="new-password"
                    />
                  </Box>
                  <Box textAlign="center" mt={5}>
                    <Button
                      id="reset-password-button"
                      type="submit"
                      label={t('resetPassword.form.buttonText')}
                      loading={resetLoading || verifyActionCodeLoading}
                      onClick={submit}
                    />
                  </Box>
                  {resetTranslateError || verifyTranslateError ? (
                    <ErrorMessage message={(resetTranslateError || verifyTranslateError) as string} />
                  ) : null}
                  <Box mt={4} textAlign="center">
                    <Typography variant="content" as="span">
                      {t('resetPassword.goTo')}
                    </Typography>
                    <Link onClick={goToLogin}>{t('resetPassword.goToLink')}</Link>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </>
        }
      />
      <Dialog open={resetSuccess} title={t('resetPassword.success.title')}>
        <Box textAlign="center" mt={4}>
          <Button id="back-to-login-button" label={t('resetPassword.success.buttonText')} onClick={goToLogin} />
        </Box>
      </Dialog>
    </>
  );
};

ResetPassword.displayName = 'ResetPassword';

export default ResetPassword;
