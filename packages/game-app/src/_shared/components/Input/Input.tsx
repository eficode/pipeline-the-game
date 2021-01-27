import React from 'react';
import { InputVariants, LeftInputIcon, StyledInput } from './Input.styled';
import Box from '../Box';
import styled from 'styled-components';

type Props = {
  className?: string;
  variant?: InputVariants;
  iconLeft?: React.ReactElement;
} & React.ComponentProps<typeof StyledInput>;

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ variant = 'default', className, iconLeft, ...rest }, ref) => {
    return (
      <Box position="relative">
        <StyledInput
          ref={ref}
          data-cy={rest.id}
          className={className}
          withIcon={!!iconLeft}
          variant={variant}
          {...rest}
        />
        {iconLeft ? <LeftInputIcon>{iconLeft}</LeftInputIcon> : null}
      </Box>
    );
  },
);

Input.displayName = 'Input';

export default styled(Input)``;
