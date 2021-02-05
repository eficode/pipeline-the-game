import styled from 'styled-components';

export const LinkButton = styled.button<{ color?: 'blue' | 'gray'; fontSize?: string }>`
  background-color: transparent;
  border: 0;
  font-size: ${(props: { color?: 'blue' | 'gray'; fontSize?: string }) => props.fontSize ?? '16px'};
  margin-top: ${(props: { color?: 'blue' | 'gray' }) => (props.color === 'gray' ? '-4px' : '-1.5px')};
  font-weight: ${(props: { color?: 'blue' | 'gray' }) => (props.color === 'gray' ? 'none' : '600')};
  font-family: 'Montserrat';
  color: ${(props: { color?: 'blue' | 'gray' }) => (props.color === 'gray' ? '#9F998F' : '#148AB3')};
  cursor: pointer;
  text-decoration: ${(props: { color?: 'blue' | 'gray' }) => (props.color === 'gray' ? 'underline' : 'none')};
  :focus {
    outline: none;
  }
`;

LinkButton.displayName = 'LinkButton';
