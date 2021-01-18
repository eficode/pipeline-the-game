import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
};

const LinkButton = styled.button`
  background-color: transparent;
  border: 0;
  text-decoration: underline;
  font-size: 15px;
  color: #9f998f;
`;

const Link: React.FC<Props> = ({ onClick, children }) => {
  return (
    <LinkButton type="button" onClick={onClick}>
      {children}
    </LinkButton>
  );
};

Link.displayName = 'Link';

export default Link;
