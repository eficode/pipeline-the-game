import React from 'react';
import { LinkButton } from './Link.styled';

type Props = {
  onClick: () => void;
  id?: string;
};

const Link: React.FC<Props> = ({ onClick, children, id }) => {
  return (
    <LinkButton id={id} data-cy={id} type="button" onClick={onClick}>
      {children}
    </LinkButton>
  );
};

Link.displayName = 'Link';

export default Link;
