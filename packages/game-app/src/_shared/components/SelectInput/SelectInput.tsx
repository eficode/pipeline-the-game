import React from 'react';

type Option = string | { value: string; label: string };

type Props = {
  name: string;
  label: string;
  value: string;
  options: Option[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  errorMessage?: string | null;
};

const SelectInput: React.FC<Props> = ({ value, name, label, onChange, options, errorMessage }) => {
  return (
    <div className="column">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map(o => {
          const value = typeof o === 'string' ? o : o.value;
          const label = typeof o === 'string' ? o : o.label;
          return <option value={value}>{label}</option>;
        })}
      </select>
      {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
