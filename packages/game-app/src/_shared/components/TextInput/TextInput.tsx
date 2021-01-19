import React from 'react';
import styled from 'styled-components';
import { variant, color, ColorProps } from 'styled-system';
import Box from '../Box';
import Typography from '../Typography';

type Props = {
  name: string;
  label?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  type?: string;
  disabled?: boolean;
};

type InputVariants = 'default' | 'clear';

export const Input = styled.input<{ variant: InputVariants } & ColorProps>`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  &:focus {
    border: 1px solid #00867c;
  }

  ${variant({
    variants: {
      default: {
        border: '1px solid #9a9a9a',
      },
      clear: {
        border: 'none',
      },
    },
  })}
  ${color}
`;

const InputContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  ${Typography} + ${Input} {
    margin-top: 5px;
  }
`;

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, value, errorMessage, label, onChange, type = 'text', disabled }, ref) => {
    return (
      <InputContainer flexDirection="column">
        {label ? (
          <Typography as="label" variant="label" htmlFor={name}>
            {label}
          </Typography>
        ) : null}
        <Input
          ref={ref}
          variant="default"
          disabled={disabled}
          type={type}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        />
        {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
      </InputContainer>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
