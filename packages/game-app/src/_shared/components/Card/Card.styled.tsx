import styled, { css } from 'styled-components';
import { CardTag, CardType } from '@pipeline/common';
import { PANEL_CARD_SCALE } from '../../../dimensions';

interface CardHeaderProps {
  type: CardType;
}

interface CardTagProps {
  tag: CardTag;
}

const tagObj = {
  [CardTag.ManualStep]: {
    backgroundColor: '#ffd100',
  },
  [CardTag.DeliveryStep]: {
    backgroundColor: '#f7951c',
  },
  [CardTag.DeployStep]: {
    backgroundColor: '#3fc7f4',
  },
  [CardTag.Package]: {
    backgroundColor: '#e6accd',
  },
  [CardTag.SystemTest]: {
    backgroundColor: '#6e3695',
  },
} as { [key in CardTag]: { backgroundColor: string } };

export const CardWrapper = styled.div<{ dragging?: boolean; bigger?: boolean }>`
  padding: 0 0 16px;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  background: #f9f9f9;
  box-sizing: border-box;

  ${props =>
    props.bigger
      ? css`
          transform: scale(${PANEL_CARD_SCALE});
          transform-origin: 0 0;
        `
      : ''}
`;

CardWrapper.displayName = 'CardWrapper';

export const CardHeader = styled.header<CardHeaderProps>`
  padding: 8px 16px;
  box-sizing: border-box;
  height: 56px;
  background: ${props => props.theme.cardsTypes[props.type]};
  border-radius: 10px 10px 0 0;
  position: relative;
  overflow: hidden;
`;

CardHeader.displayName = 'CardHeader';

export const CardHeadingTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

CardHeadingTags.displayName = 'CardHeadingTags';

export const CardHeadingTag = styled.span<CardTagProps>`
  font-size: 8px;
  font-weight: 600;
  color: ${(props: CardTagProps) => (props.tag === CardTag.ManualStep ? 'black' : 'white')};
  background-color: ${(props: CardTagProps) => tagObj[props.tag].backgroundColor};
  border-radius: 10px;
  padding: 4px 6px;

  & + & {
    margin-left: 4px;
  }
`;

CardHeadingTag.displayName = 'CardHeadingTag';

export const CardHeading = styled.h1<{ mt?: boolean }>`
  font-size: ${props => (props.mt ? '18px' : '16px')};
  font-weight: bolder;
  text-align: right;
  color: white;
  margin-bottom: ${props => (props.mt ? 0 : '6px')};
  margin-top: ${props => (props.mt ? '10px' : 0)};
`;

CardHeading.displayName = 'CardHeading';

export const CardBody = styled.div`
  padding: 12px 16px 32px 16px;
  border-radius: 0px 0px 10px 10px;
  height: calc(100% - 48px);
`;

CardBody.displayName = 'CardBody';

export const CardBodyTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

CardBodyTitle.displayName = 'CardBodyTitle';

export const CardBodySubTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #36b2af;
  margin-bottom: 3px;
`;

CardBodySubTitle.displayName = 'CardBodySubTitle';

export const CardContent = styled.div`
  font-size: 8px;
  margin-top: 8px;
`;

CardContent.displayName = 'CardContent';

export const PatternContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 108px;
`;

PatternContainer.displayName = 'PatternContainer';
