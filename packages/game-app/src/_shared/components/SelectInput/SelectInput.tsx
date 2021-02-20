import React from 'react';
import { SelectOption } from '@pipeline/models';
import { SelectContainer, SelectLoadingWrapper, Select } from './SelectInput.styled';
import ErrorMessage from '../ErrorMessage';
import Typography from '../Typography';

type Props = {
  name: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  errorMessage?: string | null;
  /**
   * Empty option label
   */
  emptyOptionLabel?: string;
  /**
   * Loading option label
   */
  loadingOptionLabel?: string;

  tabIndex?: React.ComponentProps<typeof Select>['tabIndex'];
};

const SelectInput: React.FC<Props> = ({
  value,
  name,
  label,
  onChange,
  options,
  errorMessage,
  disabled,
  emptyOptionLabel,
  loadingOptionLabel,
  tabIndex,
}) => {
  return (
    <SelectContainer>
      <Typography as="label" variant="label" htmlFor={name}>
        {label}
      </Typography>
      <SelectLoadingWrapper>
        <Select
          disabled={disabled || options.length === 0}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          error={!!errorMessage}
          showingFakeLabel={value === ''}
          tabIndex={tabIndex}
        >
          {options.length === 0 && !disabled && loadingOptionLabel && (
            <option key={loadingOptionLabel} value="">
              {loadingOptionLabel}
            </option>
          )}
          {emptyOptionLabel ? (
            <option key={emptyOptionLabel} value="">
              {emptyOptionLabel}
            </option>
          ) : null}
          {options.map(o => {
            const value = typeof o === 'string' ? o : o.value;
            const label = typeof o === 'string' ? o : o.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </Select>
      </SelectLoadingWrapper>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </SelectContainer>
  );
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
