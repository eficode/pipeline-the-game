import React from 'react';
import Typography from '../Typography';
import ErrorMessage from '../ErrorMessage';
import { InputContainer } from './TextInput.styled';
import Input from '../Input';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  type?: string;
  disabled?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, value, errorMessage, label, placeholder, onChange, type = 'text', disabled }, ref) => {
    return (
      <InputContainer>
        {label ? (
          <Typography as="label" variant="label" htmlFor={name}>
            {label}
          </Typography>
        ) : null}
        <Input
          ref={ref}
          variant="default"
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        />
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </InputContainer>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
