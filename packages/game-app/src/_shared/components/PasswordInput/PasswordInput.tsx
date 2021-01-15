import React, { useState } from 'react';
import { IconButton } from '@pipeline/components';
import styled from 'styled-components';

type Props = {
  name: string;
  label?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
};

const IconDiv = styled.div`
  position: relative;
  & input + button {
    //TODO improve here
    position: absolute;
    right: 10px;
  }
`;

const PasswordInput: React.FC<Props> = ({ name, value, errorMessage, label, onChange }) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => setType(type => (type === 'text' ? 'password' : 'text'));

  return (
    <div className="column">
      <label htmlFor={name}>{label}</label>
      <IconDiv>
        <input type={type} value={value} name={name} id={name} onChange={onChange} />
        <IconButton onClick={toggleType}>
          <i className="gg-eye" />
        </IconButton>
      </IconDiv>
      {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
    </div>
  );
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
