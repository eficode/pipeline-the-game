import { Card } from '@pipeline/common';
import React from 'react';
import {
  CardBody,
  CardBodySubTitle,
  CardBodyTitle,
  CardContent,
  CardHeader,
  CardHeading,
  CardHeadingTag,
  CardHeadingTags,
  CardWrapper,
  PatternContainer,
} from './Card.styled';
import { ReactComponent as PipePattern } from '@assets/icons/card-pipe-pattern.svg';

type CardProps = Card & {
  headerTitle?: string;
  readOnly?: boolean;
  imgURL?: string;
  dragging?: boolean;
  bigger?: boolean;
};

const CardComponent: React.FC<CardProps> = ({
  headerTitle,
  type,
  title,
  subtitle,
  content,
  readOnly = true,
  tags,
  dragging,
  bigger,
  ...other
}) => {
  return (
    <CardWrapper dragging={dragging} bigger={bigger}>
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
