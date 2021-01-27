import React, { useState } from 'react';
import IconButton from '../IconButton';
import ErrorMessage from '../ErrorMessage';
import Typography from '../Typography';
import { InputContainer } from './PasswordInput.styled';
import Input from '../Input';

type Props = {
  name: string;
  label?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, value, errorMessage, label, onChange }, ref) => {
    const [type, setType] = useState<'text' | 'password'>('password');

    const toggleType = () => setType(type => (type === 'text' ? 'password' : 'text'));

    return (
      <InputContainer>
        <Typography mb={1} as="label" variant="label" htmlFor={name}>
          {label}
        </Typography>
        <Input
          ref={ref}
          variant="default"
          iconRight={
            <IconButton variant="clearSmall" onClick={toggleType}>
              <i className="gg-eye" />
            </IconButton>
          }
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

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
