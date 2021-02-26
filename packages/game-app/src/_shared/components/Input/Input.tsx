import React from 'react';
import { InputVariants, LeftInputIcon, RightInputIcon, StyledInput } from './Input.styled';
import Box from '../Box';
import styled from 'styled-components';

type Props = {
  className?: string;
  variant?: InputVariants;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  WrapperComponent?: React.ComponentType;
} & React.ComponentProps<typeof StyledInput>;

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ variant = 'default', className, iconLeft, iconRight, WrapperComponent, ...rest }, ref) => {
    const Wrapper = WrapperComponent || Box;
    return (
      <Wrapper position="relative" width="100%">
        <StyledInput
          ref={ref}
          data-cy={rest.id}
          className={className}
          withIcon={!!iconLeft}
          variant={variant}
          maxLength={100}
          {...rest}
        />
        {iconLeft ? <LeftInputIcon>{iconLeft}</LeftInputIcon> : null}
        {iconRight ? <RightInputIcon>{iconRight}</RightInputIcon> : null}
      </Wrapper>
    );
  },
);

Input.displayName = 'Input';

export default styled(Input)``;
