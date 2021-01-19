import styled from 'styled-components';
import { color, ColorProps, variant } from 'styled-system';
import Box from '../Box';
import React from 'react';
import Typography from '../Typography';

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
    border: 1px solid ${props => props.theme.colors.activeAccent};
  }

  ${({ theme }) =>
    variant({
      variants: {
        default: theme.input.variants.default,
        clear: theme.input.variants.clear,
      },
    })} ${color}
`;

Input.displayName = 'Input';
export const InputContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: column;

  ${Typography} + ${Input} {
    margin-top: 5px;
  }
`;

InputContainer.displayName = 'InputContainer';
