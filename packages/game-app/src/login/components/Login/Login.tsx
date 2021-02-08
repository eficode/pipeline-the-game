import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import { Box, Button, ErrorMessage, Link, PasswordInput, TowColumnPage, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useLogin } from '@pipeline/auth';
import { useLocation } from 'react-router-dom';
import { RoutingPath, useNavigateTo, useNavigateOutsideTo } from '@pipeline/routing';
import { LoginForm, PrivacySpan, Separator } from './Login.styled';

type Props = {};

const Login: React.FC<Props> = () => {
  const t = useTranslate();

  const methods = useForm<{ email: string; password: string }>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const { call: login, translatedError: loginTranslateError, loading: loginLoading } = useLogin();

  const submit = useMemo(() => handleSubmit(login), [login, handleSubmit]);

  const location = useLocation<{ desiredUrl: string }>();

  const goToSignUp = useNavigateTo(RoutingPath.Signup, location.state);
  const goToForgotPassword = useNavigateTo(RoutingPath.ForgotPassword);

  const openPrivacyPolicy = useNavigateOutsideTo('https://www.eficode.com');

  const passwordProps = useMemo(() => {
    return {
      onForgotPassword: goToForgotPassword,
      forgotPasswordLabel: t('login.form.password.forgot'),
    };
  }, [t, goToForgotPassword]);

  return (
    <TowColumnPage
      left={
        <LoginForm error={!!loginTranslateError}>
          <Typography variant="title">{t('login.title')}</Typography>
          <Box mt={5}>
            <FormProvider {...methods}>
              <form onSubmit={submit}>
                <FormTextField
                  name="email"
                  label={t('login.form.email.label')}
                  placeholder={t('login.form.email.placeholder')}
                />
                <Box mt={3}>
                  <FormTextField
                    CustomInput={PasswordInput}
                    name="password"
                    label={t('login.form.password.label')}
                    placeholder={t('login.form.password.placeholder')}
                    {...passwordProps}
                  />
                </Box>
                <Box textAlign="center" mt={5}>
                  <Button type="submit" label={t('login.form.buttonText')} loading={loginLoading} onClick={submit} />
                </Box>
                {loginTranslateError ? <ErrorMessage message={loginTranslateError} /> : null}
                <Box mt={4} textAlign="center">
                  <PrivacySpan>{t('login.privacy.text')}</PrivacySpan>
                  <Link onClick={openPrivacyPolicy} variant="tinyBlue">
                    {t('login.privacy.link')}
                  </Link>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" mt={4}>
                  <Separator />
                </Box>
                <Box mt={4} textAlign="center">
                  <span>{t('login.notYetAccount')}</span>&nbsp;
                  <Link onClick={goToSignUp}>{t('login.goToSignup')}</Link>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </LoginForm>
      }
    />
  );
};

Login.displayName = 'Login';

export default Login;
