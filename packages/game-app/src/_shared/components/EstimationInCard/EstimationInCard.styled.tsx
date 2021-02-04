import styled, { css } from 'styled-components';

export const EstimationCardContent = styled.div<{ moving?: boolean }>`
  width: 80px;
  height: 32px;
  background: #096762;
  border-radius: 10px 20px 20px 10px;
  opacity: 1;
  position: absolute;
  top: 12px;
  left: -4px;
  line-height: 32px;
  color: white;
  padding-left: 16px;
  z-index: 100001;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props =>
    props.moving &&
    css`
      opacity: 0.5;
    `}
`;

EstimationCardContent.displayName = 'EstimationCardContent';
