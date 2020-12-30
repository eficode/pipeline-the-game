import React, { useCallback } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { SelectInput } from '@pipeline/components';

type Props = {} & Omit<React.ComponentProps<typeof SelectInput>, 'errorMessage' | 'onChange' | 'value'>;

const FormSelect: React.FC<Props> = ({ name, label, options, disabled }) => {
  const data = useFormContext();

  const error = data.errors[name];

  const renderInput = useCallback(
    (props: ControllerRenderProps) => {
      return (
        <SelectInput
          name={props.name}
          label={label}
          value={props.value}
          options={options}
          onChange={props.onChange}
          disabled={disabled}
          errorMessage={error ? error.message : null}
        />
      );
    },
    [error, label, options, disabled],
  );

  return (
    <>
      <Controller name={name} control={data.control} render={renderInput} />
    </>
  );
};

FormSelect.displayName = 'FormSelect';

export default FormSelect;
