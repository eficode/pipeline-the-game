import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import { animations, PasswordInput } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useLogin } from '@pipeline/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';
import { Button, Link } from '@pipeline/components';
import styled from 'styled-components';

type Props = {};

const LoginForm = styled.div<{ error?: boolean }>`
  ${props => props.error && animations.shake()}
`;

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
    <div className="login">
      <LoginForm className="content card" error={!!loginTranslateError}>
        <h2>{t('login.title')}</h2>
        <FormProvider {...methods}>
          <FormTextField name="email" label={t('login.form.emailLabel')} />
          <FormTextField CustomInput={PasswordInput} name="password" label={t('login.form.passwordLabel')} />
          <div className="text-center">
            <Button label={t('login.form.buttonText')} onClick={submit} />
          </div>
          {loginTranslateError ? <span className="error-message">{loginTranslateError}</span> : null}
          {loginLoading ? <span>Loading</span> : null}
          <div className="text-center">
            <span>{t('login.notYetAccount')}</span>&nbsp;
            <Link onClick={goToSignUp}>{t('login.goToSignup')}</Link>
          </div>
        </FormProvider>
      </LoginForm>
    </div>
  );
};

Login.displayName = 'Login';

export default Login;
