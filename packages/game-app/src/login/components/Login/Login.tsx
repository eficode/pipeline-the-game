import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextField } from '@pipeline/form';
import { animations, PasswordInput } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { useLogin } from '@pipeline/auth';
import { useHistory } from 'react-router-dom';
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

  const handleSubmit = methods.handleSubmit;

  const { call, translatedError, loading } = useLogin();

  const submit = useMemo(() => handleSubmit(call), [handleSubmit, call]);

  const history = useHistory();

  const goToSignUp = useCallback(() => {
    history.push(RoutingPath.Signup);
  }, [history]);

  return (
    <div className="login">
      <LoginForm className="content card" error={!!translatedError}>
        <h2>{t('login.title')}</h2>
        <FormProvider {...methods}>
          <FormTextField name="email" label={t('login.form.emailLabel')} />
          <FormTextField CustomInput={PasswordInput} name="password" label={t('login.form.passwordLabel')} />
          <div className="text-center">
            <Button label={t('login.form.buttonText')} onClick={submit} />
          </div>
          {translatedError ? <span className="error-message">{translatedError}</span> : null}
          {loading ? <span>Loading</span> : null}
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
