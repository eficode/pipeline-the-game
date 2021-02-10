import React, { useState } from 'react';
import IconButton from '../IconButton';
import ErrorMessage from '../ErrorMessage';
import Typography from '../Typography';
import { InputContainer, LabelContainer } from './PasswordInput.styled';
import Input from '../Input';
import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg';
import { ReactComponent as HideIcon } from '../../../assets/icons/hide-password.svg';
import Box from '../Box';
import Link from '../Link';
import PopoverDetails from '../PopoverDetails';
import StyledIcon from '../Icon';

type Props = {
  name: string;
  label?: string;
  labelDetails?: string;
  placeholder?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  onForgotPassword?: () => void;
  forgotPasswordLabel?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    { name, value, errorMessage, label, labelDetails, placeholder, onChange, forgotPasswordLabel, onForgotPassword },
    ref,
  ) => {
    const [type, setType] = useState<'text' | 'password'>('password');

    const toggleType = () => setType(type => (type === 'text' ? 'password' : 'text'));

    return (
      <InputContainer>
        <LabelContainer>
          <Box display="flex" flexDirection="row">
            <Typography mb={1} as="label" variant="label" htmlFor={name}>
              {label}
            </Typography>
            {labelDetails && <PopoverDetails details={labelDetails} />}
          </Box>
          {forgotPasswordLabel && onForgotPassword && (
            <Link id="forgot-password-button" variant="smallGray" onClick={onForgotPassword}>
              {forgotPasswordLabel}
            </Link>
          )}
        </LabelContainer>
        <Input
          ref={ref}
          variant="default"
          iconRight={
            <IconButton variant="clearSmall" onClick={toggleType}>
              <StyledIcon variant="small">{type === 'password' ? <EyeIcon /> : <HideIcon />}</StyledIcon>
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
