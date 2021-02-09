import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import { Box, Button, ErrorMessage, Link, PasswordInput, TowColumnPage, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useLogin } from '@pipeline/auth';
import { useLocation } from 'react-router-dom';
import { RoutingPath, useNavigateTo } from '@pipeline/routing';
import { LoginForm } from './Login.styled';

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

  return (
    <TowColumnPage
      left={
        <LoginForm error={!!loginTranslateError}>
          <Typography variant="title">{t('login.title')}</Typography>
          <Box mt={5}>
            <FormProvider {...methods}>
              <form onSubmit={submit}>
                <FormTextField name="email" label={t('login.form.emailLabel')} />
                <Box mt={3}>
                  <FormTextField CustomInput={PasswordInput} name="password" label={t('login.form.passwordLabel')} />
                </Box>
                <Box textAlign="center" mt={5}>
                  <Button type="submit" label={t('login.form.buttonText')} loading={loginLoading} onClick={submit} />
                </Box>
                {loginTranslateError ? <ErrorMessage message={loginTranslateError} /> : null}
                <Box display="flex" flexDirection="row" justifyContent="center" mt={4}>
                  <span>{t('login.notYetAccount')}</span>&nbsp;
                  <Link id="go-to-signup" onClick={goToSignUp}>
                    {t('login.goToSignup')}
                  </Link>
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
