import styled from 'styled-components';

export const LinkButton = styled.button`
  background-color: transparent;
  border: 0;
  text-decoration: underline;
  font-size: 15px;
  color: #9f998f;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

LinkButton.displayName = 'LinkButton';
