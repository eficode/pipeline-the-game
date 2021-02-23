import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage';
import { Box } from '@pipeline/components';
import Typography from '../Typography';

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
  margin-top: 5px;

  :active {
    outline: none;
  }
`;

const TextArea: React.FC<Props> = ({ name, value, errorMessage, label, onChange, disabled }) => {
  return (
    <Box display="flex" flexDirection="column">
      {label ? (
        <Typography as="label" variant="label" htmlFor={name}>
          {label}
        </Typography>
      ) : null}
      <StyledTextArea rows={4} disabled={disabled} value={value} name={name} id={name} onChange={onChange as any} />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </Box>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
