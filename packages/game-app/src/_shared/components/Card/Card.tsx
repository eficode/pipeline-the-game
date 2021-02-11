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
} from './Card.styled';

type CardProps = Card & {
  typeLabel: string;
  tagsLabels: string[];
  headerTitle?: string;
  readOnly?: boolean;
  imgURL?: string;
  dragging?: boolean;
  bigger?: boolean;
};

const CardComponent: React.FC<CardProps> = ({
  headerTitle,
  type,
  typeLabel,
  title,
  subtitle,
  content,
  readOnly = true,
  tags,
  tagsLabels,
  dragging,
  bigger,
}) => {
  return (
    <CardWrapper dragging={dragging} bigger={bigger}>
      <CardHeader type={type}>
        <CardHeading>{typeLabel}</CardHeading>
        <CardHeadingTags>
          {tags?.map((t, index) => (
            <CardHeadingTag key={t} tag={t}>
              {tagsLabels[index]}
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
