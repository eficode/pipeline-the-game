import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage';
import { Box } from '@pipeline/components';
import Typography from '../Typography';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  disabled?: boolean;
};

const StyledTextArea = styled.textarea`
  padding: 5px 10px;
  resize: none;
  margin-top: 5px;
  border-radius: 8px;
  border: 1px solid #d7d2cb;
  font-family: Montserrat;
  font-size: 14px;

  :active,
  :focus {
    outline: none;
  }

  &:focus {
    border: 1px solid ${props => props.theme.colors.activeAccent};
  }
`;

const TextArea: React.FC<Props> = ({ name, value, errorMessage, label, onChange, disabled, placeholder }) => {
  return (
    <Box display="flex" flexDirection="column">
      {label ? (
        <Typography as="label" variant="label" htmlFor={name}>
          {label}
        </Typography>
      ) : null}
      <StyledTextArea
        rows={4}
        disabled={disabled}
        value={value}
        name={name}
        id={name}
        onChange={onChange as any}
        placeholder={placeholder}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </Box>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
