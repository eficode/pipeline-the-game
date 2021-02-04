import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormSelect, FormTextField } from '@pipeline/form';
import { useDevOpsMaturities, useGameRoles } from '@pipeline/dynamicData';
import { Box, Button, ErrorMessage, Link, PasswordInput, TowColumnPage, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { RoutingPath, useNavigateOnCondition, useNavigateTo } from '@pipeline/routing';

import { SignupInfo } from '../../types/signupInfo';
import useSignup from '../../hooks/useSignup';
import { signupValidationSchema } from '../../utils/validation';

type Props = {};

const Signup: React.FC<Props> = () => {
  const t = useTranslate();

  const methods = useForm<SignupInfo>({
    defaultValues: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
      devOpsMaturity: '',
      repeatPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(signupValidationSchema),
  });

  const { handleSubmit } = methods;

  const {
    call: signup,
    loading: signupLoading,
    translatedError: signupTranslateError,
    success: signupSuccess,
  } = useSignup();

  const devOpsMaturities = useDevOpsMaturities();
  const gameRoles = useGameRoles();

  const location = useLocation<{ desiredUrl: string }>();

  const submit = useMemo(
    () =>
      handleSubmit((info: SignupInfo) => {
        info.desiredUrl = location.state?.desiredUrl;
        signup(info);
      }),
    [signup, handleSubmit, location],
  );

  const goToSignIn = useNavigateTo(RoutingPath.Login, location.state);

  useNavigateOnCondition(signupSuccess, RoutingPath.EmailVerificationRequired);

  return (
    <TowColumnPage
      left={
        <Box>
          <Typography variant="title">{t('signup.title')}</Typography>
          <Box mt={5}>
            <FormProvider {...methods}>
              <form onSubmit={submit}>
                <Box display="flex" flexDirection="row">
                  <Box flex={1}>
                    <FormTextField name="firstName" label={t('signup.form.firstNameLabel')} />
                  </Box>
                  <Box flex={1} ml={3}>
                    <FormTextField name="lastName" label={t('signup.form.lastNameLabel')} />
                  </Box>
                </Box>
                <Box mt={3}>
                  <FormTextField type="email" name="email" label={t('signup.form.emailLabel')} />
                </Box>
                <Box mt={3}>
                  <FormTextField CustomInput={PasswordInput} name="password" label={t('signup.form.passwordLabel')} />
                </Box>
                <Box mt={3}>
                  <FormTextField
                    CustomInput={PasswordInput}
                    name="repeatPassword"
                    label={t('signup.form.repeatPasswordLabel')}
                  />
                </Box>
                <Box mt={3}>
                  <FormSelect name="role" label={t('signup.form.roleLabel')} options={gameRoles} />
                </Box>
                <Box mt={3}>
                  <FormSelect name="devOpsMaturity" label={t('signup.form.maturityLabel')} options={devOpsMaturities} />
                </Box>
                <Box mt={5} textAlign="center">
                  <Button type="submit" id="signup-button"
                    label={t('signup.form.buttonText')}
                    loading={signupLoading}
                    onClick={submit}
                  />
                </Box>

                {signupTranslateError ? <ErrorMessage message={signupTranslateError} /> : null}
                {signupSuccess ? <span>Success</span> : null}
                <Box mt={4} display="flex" flexDirection="row" justifyContent="center">
                  <span>{t('signup.alreadyAccount')}</span>&nbsp;
                  <Link onClick={goToSignIn}>{t('signup.goToSignIn')}</Link>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Box>
      }
    />
  );
};

Signup.displayName = 'Signup';

export default Signup;
