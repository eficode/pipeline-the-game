import React from 'react';
import { SelectOption } from '@pipeline/models';

type Props = {
  name: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  errorMessage?: string | null;
};

const SelectInput: React.FC<Props> = ({ value, name, label, onChange, options, errorMessage, disabled }) => {
  return (
    <div className="column">
      <label htmlFor={name}>{label}</label>
      <div className="row">
        <select disabled={disabled || options.length === 0} name={name} id={name} value={value} onChange={onChange}>
          {options.map(o => {
            const value = typeof o === 'string' ? o : o.value;
            const label = typeof o === 'string' ? o : o.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        {options.length === 0 && !disabled && <div>Loading...</div>}
      </div>
      {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
