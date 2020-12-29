import React, { useCallback } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { TextInput } from '@pipeline/components';

type Props = {
  name: string;
  label: string;
};

const FormTextField: React.FC<Props> = ({ name, label }) => {
  const data = useFormContext();

  const error = data.errors[name];

  const renderInput = useCallback(
    (props: ControllerRenderProps) => {
      return (
        <TextInput
          name={props.name}
          label={label}
          value={props.value}
          onChange={props.onChange}
          errorMessage={error?.message}
        />
      );
    },
    [error, label],
  );

  return (
    <>
      <Controller name={name} control={data.control} render={renderInput} />
    </>
  );
};

FormTextField.displayName = 'FormTextField';

export default FormTextField;
