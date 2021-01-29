import React from 'react';
import { InputVariants, LeftInputIcon, RightInputIcon, StyledInput } from './Input.styled';
import Box from '../Box';
import styled from 'styled-components';

type Props = {
  className?: string;
  variant?: InputVariants;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
} & React.ComponentProps<typeof StyledInput>;

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ variant = 'default', className, iconLeft, iconRight, ...rest }, ref) => {
    return (
      <Box position="relative" width="100%">
        <StyledInput
          ref={ref}
          data-cy={rest.id}
          className={className}
          withIcon={!!iconLeft}
          variant={variant}
          {...rest}
        />
        {iconLeft ? <LeftInputIcon>{iconLeft}</LeftInputIcon> : null}
        {iconRight ? <RightInputIcon>{iconRight}</RightInputIcon> : null}
      </Box>
    );
  },
);

Input.displayName = 'Input';

export default styled(Input)``;
