import React, { useState } from 'react';
import IconButton from '../IconButton';
import ErrorMessage from '../ErrorMessage';
import Typography from '../Typography';
import { IconDiv, InputContainer } from './PasswordInput.styled';
import { Input } from '@pipeline/components';

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
        <Typography as="label" variant="label" htmlFor={name}>
          {label}
        </Typography>
        <IconDiv>
          <Input ref={ref} variant="default" type={type} value={value} name={name} id={name} onChange={onChange} />
          <IconButton variant="clear" onClick={toggleType}>
            <i className="gg-eye" />
          </IconButton>
        </IconDiv>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </InputContainer>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
