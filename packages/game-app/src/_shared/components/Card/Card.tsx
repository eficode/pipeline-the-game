import { Card, CardType } from '@pipeline/common';
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

import { ReactComponent as PipelineStepPipeImage } from '../../../assets/images/pipeline-step-pipe.svg';
import { ReactComponent as ReviewPipeImage } from '../../../assets/images/review-pipe.svg';
import { ReactComponent as ScenarioPipeImage } from '../../../assets/images/scenario-pipe.svg';
import { ReactComponent as GameRulePipeImage } from '../../../assets/images/game-rule-pipe.svg';

import Box from '../Box';

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
  const image =
    type === CardType.PipelineStep ? (
      <PipelineStepPipeImage />
    ) : type === CardType.GameRule ? (
      <GameRulePipeImage />
    ) : type === CardType.Scenario ? (
      <ScenarioPipeImage />
    ) : (
      <ReviewPipeImage />
    );

  return (
    <CardWrapper dragging={dragging} bigger={bigger}>
      <CardHeader type={type}>
        <Box position="absolute" marginTop={-40} marginLeft={-20} width={90}>
          {image}
        </Box>
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
