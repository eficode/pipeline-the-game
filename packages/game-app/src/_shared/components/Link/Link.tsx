import React from 'react';
import { LinkButton } from './Link.styled';

type Props = {
  onClick: () => void;
  id?: string;
  color?: 'blue' | 'gray';
  fontSize?: string;
};

const Link: React.FC<Props> = ({ onClick, children, id, color, fontSize }) => {
  return (
    <LinkButton id={id} data-cy={id} type="button" onClick={onClick} color={color} fontSize={fontSize}>
      {children}
    </LinkButton>
  );
};

Link.displayName = 'Link';

export default Link;
