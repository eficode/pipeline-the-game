import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage';

type Props = {
  name: string;
  label?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  disabled?: boolean;
};

const StyledTextArea = styled.textarea`
  border: 0;
  border-radius: 10px;
  resize: none;
  width: 100%;
`;

const TextArea: React.FC<Props> = ({ name, value, errorMessage, label, onChange, disabled }) => {
  return (
    <div className="column">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <StyledTextArea rows={4} disabled={disabled} value={value} name={name} id={name} onChange={onChange as any} />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
