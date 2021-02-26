import React from 'react';
import Typography from '../Typography';
import ErrorMessage from '../ErrorMessage';
import { InputContainer } from './TextInput.styled';
import Input from '../Input';
import Box from '../Box';
import PopoverDetails from '../PopoverDetails';

type Props = {
  name: string;
  label?: string;
  labelDetails?: string;
  placeholder?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  type?: string;
  disabled?: boolean;
  tabIndex?: React.ComponentProps<typeof Input>['tabIndex'];
  autoComplete?: React.ComponentProps<typeof Input>['autocomplete'];
  maxLength?: React.ComponentProps<typeof Input>['maxLength'];
};

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      value,
      errorMessage,
      label,
      labelDetails,
      placeholder,
      onChange,
      type = 'text',
      disabled,
      tabIndex,
      autoComplete,
      maxLength,
    },
    ref,
  ) => {
    return (
      <InputContainer>
        {label ? (
          <Box display="flex" flexDirection="row">
            <Typography mb={1} as="label" variant="label" htmlFor={name}>
              {label}
            </Typography>
            {labelDetails && <PopoverDetails details={labelDetails} />}
          </Box>
        ) : null}
        <Input
          ref={ref}
          variant={!!errorMessage ? 'defaultError' : 'default'}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          tabIndex={tabIndex}
          autoComplete={autoComplete}
          maxLength={maxLength}
        />
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </InputContainer>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
