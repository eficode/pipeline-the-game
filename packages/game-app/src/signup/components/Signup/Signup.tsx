import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect, FormTextField } from '@pipeline/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupInfo } from '../../types/signupInfo';
import useSignup from '../../hooks/useSignup';
import {
  useRetrieveDevOpsMaturities,
  useRetrieveGameRoles,
} from '../../../_shared/dynamicData/hooks/useRetrieveDynamicData';
import { useSelector } from 'react-redux';
import { selectors as dynamicDataSelectors } from '@pipeline/dynamicData';

type Props = {};

const schema = yup.object().shape({
  email: yup.string().required('signup.required').email('signup.invalidEmail'),
  password: yup
    .string()
    .required('signup.required')
    .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'), 'signup.passwordRequirements'),
  repeatPassword: yup
    .string()
    .required('signup.required')
    .oneOf([yup.ref('password')], 'signup.passwordMatch'),
  role: yup.string().required('signup.required'),
  devOpsMaturity: yup.string().required('signup.required'),
});

const Signup: React.FC<Props> = () => {
  const gameRoles = useSelector(dynamicDataSelectors.getGameRoles);
  const devOpsMaturities = useSelector(dynamicDataSelectors.getDevOpsMaturities);

  const methods = useForm<SignupInfo>({
    defaultValues: {},
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const {
    call: signup,
    loading: signupLoading,
    translatedError: signupTranslateError,
    success: signupSuccess,
  } = useSignup();

  const { call: retrieveDevOpsMaturities } = useRetrieveDevOpsMaturities();
  const { call: retrieveGameRoles } = useRetrieveGameRoles();

  const submit = useMemo(
    () =>
      handleSubmit((info: SignupInfo) => {
        signup(info);
      }),
    [signup, handleSubmit],
  );

  useEffect(() => {
    retrieveGameRoles();
    retrieveDevOpsMaturities();
  }, [retrieveGameRoles, retrieveDevOpsMaturities]);

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
