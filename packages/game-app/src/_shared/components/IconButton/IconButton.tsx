import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
};

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px;
`;

const IconButton: React.FC<Props> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

IconButton.displayName = 'IconButton';

export default IconButton;
