import styled, { css } from 'styled-components';

export const CardWrapper = styled.div<{ isDragging?: boolean }>`
  cursor: pointer;
  transition: all 0.3s ease-out;

  ${props =>
    props.isDragging &&
    css`
      opacity: 0.5;
    `}
`;
