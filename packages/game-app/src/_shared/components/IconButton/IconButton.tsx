import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  className?: string;
  active?: boolean;
};

const StyledButton = styled.button<{ active?: boolean }>`
  background-color: transparent;
  border: none;
  padding: 8px;
  color: #b4aea9;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  box-sizing: border-box;

  &:hover {
    color: #00867c;
  }

  &:active {
    background: #eeeeee;
    color: #00867c;
  }

  ${props =>
    props.active &&
    `
    background: #EEEEEE;
    color: #00867C;
  `}
`;

const IconButton: React.FC<Props> = ({ children, onClick, className, active }) => {
  return (
    <StyledButton type="button" onClick={onClick} className={className} active={active}>
      {children}
    </StyledButton>
  );
};

IconButton.displayName = 'IconButton';

export default styled(IconButton)``;
