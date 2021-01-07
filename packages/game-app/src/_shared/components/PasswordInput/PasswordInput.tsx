import React, { useState } from 'react';

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
};

const PasswordInput: React.FC<Props> = ({ name, value, errorMessage, label, onChange }) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => setType(type => (type === 'text' ? 'password' : 'text'));

  return (
    <div className="column">
      <label htmlFor={name}>{label}</label>
      <div className="p-relative">
        <input type={type} value={value} name={name} id={name} onChange={onChange} />
        <button type="button" className="icon-button" onClick={toggleType}>
          <i className="gg-eye"></i>
        </button>
      </div>
      {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
