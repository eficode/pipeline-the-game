import styled, { css } from 'styled-components';

export const BoardContainer = styled.div<{ scale: number }>`
  background-color: #eeeeee;
  width: 3840px;
  height: 2160px;
  padding: 16px;
  position: relative;
  z-index: -999999;
  min-width: 3840px;
  min-height: 2160px;

  ${({ scale }) =>
    scale > 0 &&
    css`
      background-image: linear-gradient(
          0deg,
          transparent 24%,
          rgba(0, 0, 0, 0.05) 25%,
          rgba(0, 0, 0, 0.05) 26%,
          transparent 27%,
          transparent 74%,
          rgba(0, 0, 0, 0.05) 75%,
          rgba(0, 0, 0, 0.05) 76%,
          transparent 77%,
          transparent
        ),
        linear-gradient(
          90deg,
          transparent 24%,
          rgba(0, 0, 0, 0.05) 25%,
          rgba(0, 0, 0, 0.05) 26%,
          transparent 27%,
          transparent 74%,
          rgba(0, 0, 0, 0.05) 75%,
          rgba(0, 0, 0, 0.05) 76%,
          transparent 77%,
          transparent
        );
    `}

  ${({ scale }) => scale >= 4 && 'background-size:15px 15px;'}
  ${({ scale }) => scale >= 2 && scale < 4 && 'background-size:30px 30px;'}
  ${({ scale }) => scale >= 1 && scale < 2 && 'background-size:60px 60px;'}
  ${({ scale }) => scale > 0 && scale < 1 && 'background-size:120px 120px;'}
`;

BoardContainer.displayName = 'BoardContainer';
