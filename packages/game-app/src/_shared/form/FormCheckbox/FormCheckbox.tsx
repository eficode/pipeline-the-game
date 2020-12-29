import React, { useCallback } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
};

const FormCheckbox: React.FC<Props> = ({ name, label }) => {
  const data = useFormContext();

  const renderInput = useCallback(
    (props: ControllerRenderProps) => {
      return (
        <>
          <input
            type="checkbox"
            id={props.name}
            name={props.name}
            checked={props.value}
            onChange={e => props.onChange(e.target.checked)}
          />
          <label htmlFor={props.name}>{label}</label>
        </>
      );
    },
    [label],
  );

  return <Controller name={name} control={data.control} render={renderInput} />;
};

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
