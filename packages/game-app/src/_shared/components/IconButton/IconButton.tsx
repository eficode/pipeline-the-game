import React from 'react';
import styled from 'styled-components';
import { IconButtonVariants, StyledButton } from './IconButton.styled';

type Props = {
  onClick: () => void;
  className?: string;
  active?: boolean;
  variant?: IconButtonVariants;
  id?: string;
  testId?: string;
};

const IconButton: React.FC<Props> = ({ children, onClick, className, active, variant = 'default', id, testId }) => {
  return (
    <StyledButton
      id={id}
      data-cy={testId || id}
      type="button"
      variant={variant}
      onClick={onClick}
      className={className}
      active={active}
    >
      {children}
    </StyledButton>
  );
};

IconButton.displayName = 'IconButton';

export default styled(IconButton)``;
