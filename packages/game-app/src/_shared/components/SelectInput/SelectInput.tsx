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
   * If the component should show also an empty option that is selected by default
   */
  emptyOption?: boolean;
  /**
   * Empty option label
   */
  emptyOptionLabel?: string;
};

const SelectInput: React.FC<Props> = ({
  value,
  name,
  label,
  onChange,
  options,
  errorMessage,
  disabled,
  emptyOption,
  emptyOptionLabel,
}) => {
  return (
    <SelectContainer>
      <Typography as="label" variant="label" htmlFor={name}>
        {label}
      </Typography>
      <SelectLoadingWrapper>
        <Select disabled={disabled || options.length === 0} name={name} id={name} value={value} onChange={onChange}>
          {emptyOption && emptyOptionLabel ? (
            <option key="" value="">
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
        {options.length === 0 && !disabled && <div>Loading...</div>}
      </SelectLoadingWrapper>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </SelectContainer>
  );
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
