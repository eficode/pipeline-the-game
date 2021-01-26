import styled, { css } from 'styled-components';
import { padding, PaddingProps } from 'styled-system';
import { Icon } from '@pipeline/components';

export const RuleWrapper = styled.div<{ collapsed: boolean }>`
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.5s ease-out;
  margin-bottom: 16px;

  ${({ collapsed }) =>
    collapsed
      ? css`
          color: white;
        `
      : css`
          background: white;
        `}
`;

RuleWrapper.displayName = 'RuleWrapper';

export const RuleHeader = styled.div<PaddingProps & { collapsed: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  ${Icon} {
    margin-right: 16px;
  }

  &:before {
    content: '';
    position: absolute;
    left: 16px;
    bottom: 0;
    height: 1px;
    width: calc(100% - 32px);

    ${({ collapsed }) =>
      collapsed
        ? css`
            border-bottom: 1px solid white;
          `
        : css`
            border-bottom: 1px solid lightgray;
          `}
  }

  ${padding}
`;

RuleHeader.displayName = 'RuleHeader';

export const CollapsibleRuleContent = styled.div<{ collapsed: boolean }>`
  transition: all 0.5s ease-out;
  box-sizing: border-box;
  overflow: hidden;

  ${({ collapsed }) =>
    collapsed
      ? css`
          max-height: 0 !important;
        `
      : css`
          max-height: 500px;
          transition: max-height 0.5s ease-in;
        `}
`;

CollapsibleRuleContent.displayName = 'CollapsibleRuleContent';

export const RuleContent = styled.div`
  padding: 34px 34px 24px 34px;
`;

RuleContent.displayName = 'RuleContent';
