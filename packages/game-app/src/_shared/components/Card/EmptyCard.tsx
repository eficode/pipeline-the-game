import { CardType } from '@pipeline/common';
import React from 'react';
import { CardBody, CardHeader, CardHeading, CardWrapper } from './Card.styled';
import Box from '../Box';
import { ReactComponent as TextLogoImage } from '../../../assets/images/eficode-text-logo.svg';
import { ReactComponent as PipelineStepPipeImage } from '../../../assets/images/pipeline-step-pipe.svg';
import { ReactComponent as ReviewPipeImage } from '../../../assets/images/review-pipe.svg';
import { ReactComponent as ScenarioPipeImage } from '../../../assets/images/scenario-pipe.svg';
import { ReactComponent as GameRulePipeImage } from '../../../assets/images/game-rule-pipe.svg';

type CardProps = {
  type: CardType;
  className?: string;
};

const EmptyCard = React.forwardRef<HTMLDivElement, CardProps>(({ type, className }, ref) => {
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
    <CardWrapper ref={ref} dragging={false} bigger={false} className={className}>
      <CardHeader type={type}>
        <Box position="absolute" marginTop={-40} marginLeft={-20} width={90}>
          {image}
        </Box>
        <CardHeading mt>pipeline</CardHeading>
      </CardHeader>
      <CardBody>
        <Box height="calc(100% - 24px)" display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Box width="50px">
            <TextLogoImage />
          </Box>
        </Box>
      </CardBody>
    </CardWrapper>
  );
});

EmptyCard.displayName = 'EmptyCard';

export default EmptyCard;
