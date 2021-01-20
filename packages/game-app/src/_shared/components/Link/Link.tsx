import React from 'react';
import { LinkButton } from './Link.styled';

type Props = {
  onClick: () => void;
};

const Link: React.FC<Props> = ({ onClick, children }) => {
  return (
    <LinkButton type="button" onClick={onClick}>
      {children}
    </LinkButton>
  );
};

Link.displayName = 'Link';

export default Link;
