import React, { useCallback, useMemo } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { TextInput } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {
  name: string;
  label: string;
};

const FormTextField: React.FC<Props> = ({ name, label }) => {
  const data = useFormContext();

  const error = data.errors[name];

  const t = useTranslate();

  const translatedError = useMemo(() => {
    if (!error) {
      return undefined;
    } else {
      return t(error.message);
    }
  }, [error, t]);

  const renderInput = useCallback(
    (props: ControllerRenderProps) => {
      return (
        <TextInput
          name={props.name}
          label={label}
          value={props.value}
          onChange={props.onChange}
          errorMessage={translatedError}
        />
      );
    },
    [translatedError, label],
  );

  return (
    <>
      <Controller name={name} control={data.control} render={renderInput} />
    </>
  );
};

FormTextField.displayName = 'FormTextField';

export default FormTextField;
