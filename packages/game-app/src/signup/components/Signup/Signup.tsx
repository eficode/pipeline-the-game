import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect, FormTextField } from '@pipeline/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupInfo } from '../../types/signupInfo';
import useSignup from '../../hooks/useSignup';
import { useDevOpsMaturities, useGameRoles } from '@pipeline/dynamicData';
import { signupValidationSchema } from '../../utils/validation';
import { useTranslate } from '@pipeline/i18n';
import { PasswordInput } from '@pipeline/components';
import { RoutingPath, useNavigateOnCondition } from '@pipeline/routing';
import { useHistory } from 'react-router-dom';
import { Link, Button } from '@pipeline/ui-kit';

type Props = {};

const Signup: React.FC<Props> = () => {
  const t = useTranslate();

  const methods = useForm<SignupInfo>({
    defaultValues: {
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

  const submit = useMemo(
    () =>
      handleSubmit((info: SignupInfo) => {
        signup(info);
      }),
    [signup, handleSubmit],
  );

  const history = useHistory();

  const goToSignIn = useCallback(() => {
    history.push(RoutingPath.Login);
  }, [history]);

  useNavigateOnCondition(signupSuccess, RoutingPath.EmailVerificationRequired);

  return (
    <div className="signup">
      <div className="content card">
        <h2>{t('signup.title')}</h2>
        <FormProvider {...methods}>
          <form>
            <FormTextField type="email" name="email" label={t('signup.form.emailLabel')} />
            <FormTextField CustomInput={PasswordInput} name="password" label={t('signup.form.passwordLabel')} />
            <FormTextField
              CustomInput={PasswordInput}
              name="repeatPassword"
              label={t('signup.form.repeatPasswordLabel')}
            />
            <FormSelect name="role" label={t('signup.form.roleLabel')} options={gameRoles} />
            <FormSelect name="devOpsMaturity" label={t('signup.form.maturityLabel')} options={devOpsMaturities} />
            <div className="text-center">
              <Button id="signup-button" onClick={submit}>
                {t('signup.form.buttonText')}
              </Button>
            </div>

            {signupLoading ? <span>Loading</span> : null}
            {signupTranslateError ? <span className="error-message">{signupTranslateError}</span> : null}
            {signupSuccess ? <span>Success</span> : null}
            <div className="text-center">
              <span>{t('signup.alreadyAccount')}</span>&nbsp;
              <Link onClick={goToSignIn}>{t('signup.goToSignIn')}</Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

Signup.displayName = 'Signup';

export default Signup;
