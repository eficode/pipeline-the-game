import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect, FormTextField } from '@pipeline/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupInfo } from '../../types/signupInfo';
import useSignup from '../../hooks/useSignup';
import { useDevOpsMaturities, useGameRoles } from '@pipeline/dynamicData';
import { signupValidationSchema } from '../../utils/validation';

type Props = {};

const Signup: React.FC<Props> = () => {
  const methods = useForm<SignupInfo>({
    defaultValues: {},
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

  return (
    <div className="signup">
      <div className="content">
        <FormProvider {...methods}>
          <FormTextField name="email" label="email" />
          <FormTextField name="password" label="password" />
          <FormTextField name="repeatPassword" label="repeatPassword" />
          <FormSelect name="role" label="Role" options={gameRoles} />
          <FormSelect name="devOpsMaturity" label="Devops maturity" options={devOpsMaturities} />
          <button id="signup-button" onClick={submit}>
            Signup
          </button>
          {signupLoading ? <span>Loading</span> : null}
          {signupTranslateError ? <span className="error-message">{signupTranslateError}</span> : null}
          {signupSuccess ? <span>Success</span> : null}
        </FormProvider>
      </div>
    </div>
  );
};

Signup.displayName = 'Signup';

export default Signup;
