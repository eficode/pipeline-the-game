import React, { useCallback, useMemo } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { SelectInput } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {} & Omit<React.ComponentProps<typeof SelectInput>, 'errorMessage' | 'onChange' | 'value'>;

const FormSelect: React.FC<Props> = ({ name, label, options, disabled }) => {
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
        <SelectInput
          name={props.name}
          label={label}
          value={props.value}
          options={options}
          onChange={props.onChange}
          disabled={disabled}
          errorMessage={translatedError}
        />
      );
    },
    [translatedError, label, options, disabled],
  );

  return (
    <>
      <Controller name={name} control={data.control} render={renderInput} />
    </>
  );
};

FormSelect.displayName = 'FormSelect';

export default FormSelect;
