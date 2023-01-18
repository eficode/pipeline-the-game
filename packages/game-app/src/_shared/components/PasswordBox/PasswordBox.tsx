import { useWindowDimensions } from '../utils';
import { Box, PasswordInput } from '@pipeline/components';
import { FormTextField } from '@pipeline/form';
import React from 'react';
import { useTranslate } from '@pipeline/i18n';

type Props = {};
const PasswordBox: React.FC<Props> = () => {
  const { width } = useWindowDimensions();
  const t = useTranslate();
  const isWindowTooSmall = (width < 1100 && width > 800) || width < 500;
  if (isWindowTooSmall) {
    return (
      <>
        <Box mt={3}>
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
        <Box mt={3}>
          <FormTextField
            CustomInput={PasswordInput}
            name="repeatPassword"
            label={t('signup.form.repeatPassword.label')}
            placeholder={t('signup.form.repeatPassword.placeholder')}
            autoComplete="new-password"
            maxLength={50}
          />
        </Box>
      </>
    );
  }
  return (
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
  );
};

PasswordBox.displayName = 'PasswordBox';

export default PasswordBox;
