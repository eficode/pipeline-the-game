import React, { useState } from 'react';
import IconButton from '../IconButton';
import ErrorMessage from '../ErrorMessage';
import Typography from '../Typography';
import { InputContainer, LabelContainer } from './PasswordInput.styled';
import Input from '../Input';
import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg';
import { Link } from '@pipeline/components';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  onForgotPassword?: () => void;
  forgotPasswordLabel?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, value, errorMessage, label, placeholder, onChange, forgotPasswordLabel, onForgotPassword }, ref) => {
    const [type, setType] = useState<'text' | 'password'>('password');

    const toggleType = () => setType(type => (type === 'text' ? 'password' : 'text'));

    return (
      <InputContainer>
        <LabelContainer>
          <Typography mb={1} as="label" variant="label" htmlFor={name}>
            {label}
          </Typography>
          {forgotPasswordLabel && onForgotPassword && (
            <Link color="gray" fontSize="14px" onClick={onForgotPassword}>
              {forgotPasswordLabel}
            </Link>
          )}
        </LabelContainer>
        <Input
          ref={ref}
          variant="default"
          iconRight={
            <IconButton variant="clearSmall" onClick={toggleType}>
              <EyeIcon className="gg-eye" />
            </IconButton>
          }
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

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
