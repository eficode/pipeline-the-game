import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import { Box, Button, Link, PasswordInput, Typography, TowColumnPage } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useLogin } from '@pipeline/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';
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

  const history = useHistory();
  const location = useLocation<{ desiredUrl: string }>();

  const goToSignUp = useCallback(() => {
    history.push(RoutingPath.Signup, location.state);
  }, [history, location]);

  return (
    <TowColumnPage
      left={
        <LoginForm error={!!loginTranslateError}>
          <Typography variant="title">{t('login.title')}</Typography>
          <Box mt={5}>
            <FormProvider {...methods}>
              <FormTextField name="email" label={t('login.form.emailLabel')} />
              <Box mt={3}>
                <FormTextField CustomInput={PasswordInput} name="password" label={t('login.form.passwordLabel')} />
              </Box>
              <Box textAlign="center" mt={5}>
                <Button label={t('login.form.buttonText')} onClick={submit} />
              </Box>
              {loginTranslateError ? <span className="error-message">{loginTranslateError}</span> : null}
              {loginLoading ? <span>Loading</span> : null}
              <Box display="flex" flexDirection="row" justifyContent="center" mt={4}>
                <span>{t('login.notYetAccount')}</span>&nbsp;
                <Link onClick={goToSignUp}>{t('login.goToSignup')}</Link>
              </Box>
            </FormProvider>
          </Box>
        </LoginForm>
      }
    ></TowColumnPage>
  );
};

Login.displayName = 'Login';

export default Login;
