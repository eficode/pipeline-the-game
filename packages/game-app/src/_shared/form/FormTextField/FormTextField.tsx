import React, { useCallback, useMemo } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { TextInput } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {
  /**
   * key of the form values object in which the value will be stored
   */
  name: string;
  /**
   * Label to show over the input
   */
  label?: string;
  /**
   * Placeholder to show inside the input
   */
  placeholder?: string;
  type?: string;
  CustomInput?: React.ComponentType<React.ComponentProps<typeof TextInput>>;
  disabled?: boolean;
  others?: object;
};

/**
 * Input directly connected to the parent form that includes error message
 * visualization. Its value can be found under the {name} key in the form
 */
const FormTextField: React.FC<Props> = ({ name, label, placeholder, type, CustomInput, disabled, others }) => {
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
      const Input = CustomInput || TextInput;
      return (
        <Input
          name={props.name}
          label={label}
          placeholder={placeholder}
          value={props.value}
          onChange={props.onChange}
          errorMessage={translatedError}
          type={type}
          disabled={disabled}
          {...others}
        />
      );
    },
    [CustomInput, label, placeholder, translatedError, type, disabled, others],
  );

  return (
    <>
      <Controller name={name} control={data.control} render={renderInput} />
    </>
  );
};

FormTextField.displayName = 'FormTextField';

export default FormTextField;
