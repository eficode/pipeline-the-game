import React from 'react';

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
};

const TextInput: React.FC<Props> = ({ name, value, errorMessage, label, onChange }) => {
  return (
    <div className="column">
      <label htmlFor={name}>{label}</label>
      <input type="text" value={value} name={name} id={name} onChange={onChange} />
      {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
