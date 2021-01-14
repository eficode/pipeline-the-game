import React from 'react';

type Props = {
  name: string;
  label?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  type?: string;
  disabled?: boolean;
};

const TextInput: React.FC<Props> = ({ name, value, errorMessage, label, onChange, type = 'text', disabled }) => {
  return (
    <div className="column">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input disabled={disabled} type={type} value={value} name={name} id={name} onChange={onChange} />
      {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
