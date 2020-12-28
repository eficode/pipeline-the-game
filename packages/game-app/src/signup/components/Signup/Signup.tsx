import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect, FormTextField } from '@pipeline/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupInfo } from '../../types/signupInfo';
import useSignup from '../../hooks/useSignup';

type Props = {};

//TODO make roles and devops maturity dynamics

const roles = [
  { label: 'Have budget and make final decisions', value: 'budget-and-decisions' },
  { label: 'Define requirements and propose solutions', value: 'define-requirements' },
  { label: 'Influence decisions', value: 'influence-decisions' },
  { label: 'Give recommendations', value: 'give-recommendations' },
  { label: 'End user', value: 'end-user' },
  { label: 'Student or potential employee', value: 'student-employee' },
  { label: 'Consultant', value: 'consultant' },
  { label: 'Other', value: 'other' },
];

const devopsMaturity = [
  { label: 'Very mature', value: 'very-mature' },
  { label: 'Somewhat mature', value: 'somewhat-mature' },
  { label: 'Pretty average, really', value: 'pretty-average' },
  { label: 'Somewhat immature', value: 'somewhat-immature' },
  { label: 'Very immature', value: 'very-immature' },
  { label: "I don't know", value: 'dont-know' },
  { label: 'Varies by function or team', value: 'varies' },
];

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
  devopsMaturity: yup.string().required('signup.required'),
});

const Signup: React.FC<Props> = () => {
  const methods = useForm<SignupInfo>({
    defaultValues: {},
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const { call: signup, loading, translatedError, success } = useSignup();

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
          <FormSelect name="role" label="Role" options={roles} />
          <FormSelect name="devopsMaturity" label="Devops maturity" options={devopsMaturity} />

          <button id="signup-button" onClick={submit}>
            Signup
          </button>
          {loading ? <span>Loading</span> : null}
          {translatedError ? <span className="error-message">{translatedError}</span> : null}
          {success ? <span>Success</span> : null}
        </FormProvider>
      </div>
    </div>
  );
};

Signup.displayName = 'Signup';

export default Signup;
