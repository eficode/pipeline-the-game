import styled from 'styled-components';
import { Card, CardTags, CardTypes } from '@pipeline/common';
import React from 'react';

type CardProps = Card & { headerTitle?: string; readOnly?: boolean; imgURL?: string };

interface CardHeaderProps {
  type: CardTypes;
}

interface CardTagProps {
  tag: CardTags;
}

const tagObj = {
  [CardTags.ManualStep]: {
    backgroundColor: '#ffd100',
  },
  [CardTags.DeliveryStep]: {
    backgroundColor: '#f7951c',
  },
  [CardTags.DeployStep]: {
    backgroundColor: '#3fc7f4',
  },
  [CardTags.Package]: {
    backgroundColor: '#e6accd',
  },
  [CardTags.SystemTest]: {
    backgroundColor: '#6e3695',
  },
} as { [key in CardTags]: { backgroundColor: string } };

const CardWrapper = styled.div`
  padding: 0 0 16px;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 0px 6px #10182029;
  box-sizing: border-box;
`;

const CardHeader = styled.header<CardHeaderProps>`
  padding: 8px 16px;
  background: ${props => props.theme.cardsTypes[props.type]};
  border-radius: 10px 10px 0px 0px;
`;

const CardHeadingTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CardHeadingTag = styled.span<CardTagProps>`
  font-size: 8px;
  font-weight: 600;
  color: ${(props: CardTagProps) => (props.tag === CardTags.ManualStep ? 'black' : 'white')};
  background-color: ${(props: CardTagProps) => tagObj[props.tag].backgroundColor};
  border-radius: 10px;
  padding: 4px 6px;

  & + & {
    margin-left: 4px;
  }
`;

const CardHeading = styled.h1`
  font-size: 16px;
  font-weight: bolder;
  text-align: right;
  color: white;
  margin-bottom: 6px;
`;

const CardBody = styled.div`
  padding: 12px 16px 32px 16px;
  height: 100%;
  border-radius: 0px 0px 10px 10px;
`;

const CardBodyTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardBodySubTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #36b2af;
  margin-bottom: 3px;
`;

const CardContent = styled.div`
  font-size: 10px;
  margin-top: 8px;
`;

const CardComponent: React.FC<CardProps> = ({
  headerTitle,
  type,
  title,
  subtitle,
  content,
  readOnly = true,
  tags,
  ...other
}) => {
  return (
    <CardWrapper>
      <CardHeader type={type}>
        <CardHeading>{type}</CardHeading>
        <CardHeadingTags>
          {tags?.map(t => (
            <CardHeadingTag key={t} tag={t}>
              {t}
            </CardHeadingTag>
          ))}
        </CardHeadingTags>
      </CardHeader>
      <CardBody>
        <CardBodyTitle>{title}</CardBodyTitle>
        {subtitle && <CardBodySubTitle>{subtitle}</CardBodySubTitle>}
        <CardContent>{content}</CardContent>
      </CardBody>
    </CardWrapper>
  );
};

CardComponent.displayName = 'Card';

export default CardComponent;
