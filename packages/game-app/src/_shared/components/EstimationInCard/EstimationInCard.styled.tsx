import styled, { css } from 'styled-components';

export const EstimationCardContent = styled.button<{ moving?: boolean }>`
  width: 80px;
  height: 32px;
  background: #2c3644;
  border-radius: 10px 20px 20px 10px;
  opacity: 1;
  position: absolute;
  top: 12px;
  left: -4px;
  color: white;
  padding-left: 16px;
  z-index: 100001;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  border: none;
  font-size: 12px;
  font-family: Montserrat;
  white-space: nowrap;

  ${props =>
    props.moving &&
    css`
      opacity: 0.5;
    `}
`;

EstimationCardContent.displayName = 'EstimationCardContent';
