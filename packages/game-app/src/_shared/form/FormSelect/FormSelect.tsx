import React, { useCallback, useMemo } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { SelectInput } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {} & Omit<React.ComponentProps<typeof SelectInput>, 'errorMessage' | 'onChange' | 'value'>;

/**
 * Select directly connected to the parent form that includes error message
 * visualization. Its value can be found under the {name} key in the form
 */
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

  const emptyOptionLabel = t('general.emptyOptionLabel');
  const loadingOptionLabel = t('general.loading');

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
          emptyOptionLabel={emptyOptionLabel}
          loadingOptionLabel={loadingOptionLabel}
        />
      );
    },
    [translatedError, label, options, disabled, emptyOptionLabel, loadingOptionLabel],
  );

  return (
    <>
      <Controller name={name} control={data.control} render={renderInput} />
    </>
  );
};

FormSelect.displayName = 'FormSelect';

export default FormSelect;
