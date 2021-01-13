import styled from 'styled-components';
import { Card, CardTags, CardTypes } from '@pipeline/common';
import React from 'react';
import FontSizeResizableTextArea from './FontSizeResizableTextArea';

type CardProps = Card & { headerTitle: string; readOnly?: boolean; imgURL?: string };

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

const headerObj = {
  [CardTypes.GameRule]: {
    fromColor: '#b685ab',
    toColor: '#711d60',
  },
  [CardTypes.PipelineStep]: {
    fromColor: '#52c2b0',
    toColor: '#009778',
  },
  [CardTypes.Review]: {
    fromColor: '#fd9468',
    toColor: '#f34600',
  },
  [CardTypes.Scenario]: {
    fromColor: '#6ed6ea',
    toColor: '#00bddd',
  },
} as {
  [key in CardTypes]: {
    fromColor: string;
    toColor: string;
  };
};

const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 400px;
  height: 250px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

const CardHeader = styled.header<CardHeaderProps>`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 12px;
  padding-right: 12px;
  background: ${(props: CardHeaderProps) =>
    `linear-gradient(90deg, ${headerObj[props.type].fromColor} 0%, ${headerObj[props.type].toColor} 100%)`};
`;

const CardHeadingTag = styled.span<CardTagProps>`
  font-size: 10px;
  font-weight: bold;
  color: ${(props: CardTagProps) => (props.tag === CardTags.ManualStep ? 'black' : 'white')};
  background-color: ${(props: CardTagProps) => tagObj[props.tag].backgroundColor};
  border-radius: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 6px;
  padding-right: 6px;
  margin-left: 2px;
`;

const CardHeading = styled.h1`
  font-size: 16px;
  font-weight: bolder;
  text-align: right;
  color: white;
`;

const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
  padding-top: 12px;
  padding-bottom: 12px;
  height: 100%;
`;

const CardBodyTitle = styled.h2`
  font-size: 15px;
  font-weight: bolder;
  margin-bottom: 3px;
`;

const CardBodySubTitle = styled.h3`
  font-size: 12px;
  font-weight: bolder;
  color: #00b582;
  margin-bottom: 3px;
`;

const CardTextArea = styled(FontSizeResizableTextArea)`
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;
  overflow: hidden;
  height: 100% !important;
  width: 100% !important;
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
  console.log('tags', tags);
  return (
    <CardWrapper>
      <CardHeader type={type}>
        <CardHeading>{headerTitle}</CardHeading>
        {tags?.map(t => (
          <CardHeadingTag key={t} tag={t}>
            {t}
          </CardHeadingTag>
        ))}
      </CardHeader>
      <CardBody>
        <CardBodyTitle>{title}</CardBodyTitle>
        {subtitle && <CardBodySubTitle>{subtitle}</CardBodySubTitle>}
        <CardTextArea textAreaProps={{ readOnly: false }}>{content}</CardTextArea>
      </CardBody>
    </CardWrapper>
  );
};

CardComponent.displayName = 'Card';

export default CardComponent;
