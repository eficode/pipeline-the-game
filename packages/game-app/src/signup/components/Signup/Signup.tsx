import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormSelect, FormTextField } from '@pipeline/form';
import { useDevOpsMaturities, useGameRoles } from '@pipeline/dynamicData';
import { Box, ErrorMessage, Link, Input, PasswordInput, TwoColumnPage, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { RoutingPath, useNavigateTo, useNavigateOutsideTo } from '@pipeline/routing';

import { SignupInfo } from '../../types/signupInfo';
import useSignup from '../../hooks/useSignup';
import { signupValidationSchema } from '../../utils/validation';
import { SignupContent } from './Signup.styled';
import EmailVerificationRequiredDialog from '../EmailVerificationRequiredDialog';
import { ExternalUrl } from '@pipeline/models';

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
  const openPrivacyPolicy = useNavigateOutsideTo(ExternalUrl.PRIVACY_POLICY);

  return (
    <>
      <TwoColumnPage
        left={
          <SignupContent>
            <Typography variant="title">{t('signup.title')}</Typography>
            <Box mt={5}>
              <FormProvider {...methods}>
                <form onSubmit={submit}>
                  <Box display="flex" flexDirection="row">
                    <Box flex={1}>
                      <FormTextField
                        name="firstName"
                        label={t('signup.form.firstName.label')}
                        placeholder={t('signup.form.firstName.placeholder')}
                        autoComplete="given-name"
                        maxLength={100}
                      />
                    </Box>
                    <Box flex={1} ml={3}>
                      <FormTextField
                        name="lastName"
                        label={t('signup.form.lastName.label')}
                        placeholder={t('signup.form.lastName.placeholder')}
                        autoComplete="family-name"
                        maxLength={100}
                      />
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <FormTextField
                      type="email"
                      name="email"
                      label={t('signup.form.email.label')}
                      placeholder={t('signup.form.email.placeholder')}
                      autoComplete="email"
                      maxLength={250}
                    />
                  </Box>
                  <Box mt={3} display="flex" flexDirection="row">
                    <Box flex={1}>
                      <FormTextField
                        CustomInput={PasswordInput}
                        name="password"
                        label={t('signup.form.password.label')}
                        labelDetails={t('auth.errors.passwordRequirements')}
                        placeholder={t('signup.form.password.placeholder')}
                        autoComplete="new-password"
                        maxLength={50}
                      />
                    </Box>
                    <Box flex={1} ml={3}>
                      <FormTextField
                        CustomInput={PasswordInput}
                        name="repeatPassword"
                        label={t('signup.form.repeatPassword.label')}
                        placeholder={t('signup.form.repeatPassword.placeholder')}
                        autoComplete="new-password"
                        maxLength={50}
                      />
                    </Box>
                  </Box>

                  <Box mt={3}>
                    <FormSelect name="role" label={t('signup.form.roleLabel')} options={gameRoles} />
                  </Box>
                  <Box mt={3}>
                    <FormSelect
                      name="devOpsMaturity"
                      label={t('signup.form.maturityLabel')}
                      options={devOpsMaturities}
                    />
                  </Box>
                  <Box mt={5} textAlign="center">
                    <Input
                      type="submit"
                      id="signup-button"
                      value={t('signup.form.inputText')}
                      loading={signupLoading.toString()}
                      onClick={submit}
                    />
                  </Box>

                  {signupTranslateError ? <ErrorMessage message={signupTranslateError} /> : null}
                  {signupSuccess ? <span>Success</span> : null}
                  <Box mt={4} textAlign="center">
                    <Typography fontSize="12px" as="span">
                      {t('signup.privacy.text')}
                    </Typography>
                    <Link onClick={openPrivacyPolicy} variant="tinyBlue">
                      {t('signup.privacy.link')}
                    </Link>
                  </Box>
                  <Box mt={4} textAlign="center">
                    <Typography variant="content" as="span">
                      {t('signup.alreadyAccount')}
                    </Typography>
                    &nbsp;
                    <Link onClick={goToSignIn}>{t('signup.goToSignIn')}</Link>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </SignupContent>
        }
      />
      <EmailVerificationRequiredDialog />
    </>
  );
};

Signup.displayName = 'Signup';

export default Signup;
