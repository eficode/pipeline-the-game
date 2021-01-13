import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type' | 'ref'> & {
  type?: 'primary' | 'secondary';
  variant?: 'rounded' | 'text-icon' | 'icon';
};

const StyledButton = styled.button`
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const PrimaryButton = styled(StyledButton)`
  background-color: #101820; /* Green */
  border: none;
  color: white;
  padding: 10px 35px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 25px;
  font-weight: 600;
  margin: 15px 0;
`;

const SecondaryButton = styled(StyledButton)`
  //TODO
`;

const IconButton = styled(StyledButton)`
  background-color: transparent;
  border: none;
  padding: 8px;
`;

const Button: React.FC<Props> = ({ type = 'primary', variant = 'rounded', children, ...other }) => {
  if (type === 'primary') {
    if (variant === 'icon') {
      return (
        <IconButton type="button" {...other}>
          {children}
        </IconButton>
      );
    } else {
      return (
        <PrimaryButton type="button" {...other}>
          {children}
        </PrimaryButton>
      );
    }
  } else if (type === 'secondary') {
    return (
      <SecondaryButton type="button" {...other}>
        {children}
      </SecondaryButton>
    );
  } else {
    return null;
  }
};

Button.displayName = 'Button';

export default Button;
