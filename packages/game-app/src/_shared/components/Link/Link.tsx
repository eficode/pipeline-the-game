import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';

type Props = {
  onClick: () => void;
  id?: string;
};

type LinkVariants = 'tinyBlue' | 'tinyGray' | 'smallBlue' | 'smallGray' | 'gray' | 'blue' | 'activeAccent';

type CustomLinkProps = { variant?: LinkVariants } & Props;

export const LinkButton = styled.button<CustomLinkProps>`
  ${({ theme }) =>
    variant({
      variants: {
        tinyBlue: {
          fontSize: '12px',
          color: '#148AB3',
          marginTop: '-2px',
          fontWeight: '600',
        },
        tinyGray: {
          fontSize: '12px',
          color: '#9F998F',
          marginTop: '-2px',
          textDecoration: 'underline',
        },
        smallBlue: {
          fontSize: '14px',
          color: '#148AB3',
          marginTop: '-2px',
          fontWeight: '600',
        },
        smallGray: {
          fontSize: '14px',
          color: '#9F998F',
          marginTop: '-2px',
          textDecoration: 'underline',
        },
        gray: {
          fontSize: '16px',
          color: '#9F998F',
          marginTop: '-4px',
          textDecoration: 'underline',
        },
        blue: {
          fontSize: '16px',
          color: '#148AB3',
          marginTop: '-4px',
          fontWeight: '600',
        },
        activeAccent: {
          fontSize: '16px',
          color: theme.colors.activeAccent,
        },
      },
    })}
  background-color: transparent;
  border: 0;
  font-family: 'Montserrat';
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

LinkButton.displayName = 'LinkButton';

const Link: React.FC<CustomLinkProps> = ({ onClick, children, id, variant = 'blue' }) => {
  return (
    <LinkButton id={id} data-cy={id} type="button" onClick={onClick} variant={variant}>
      {children}
    </LinkButton>
  );
};

Link.displayName = 'Link';

export default Link;
