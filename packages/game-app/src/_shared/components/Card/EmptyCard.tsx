import { CardType } from '@pipeline/common';
import React from 'react';
import { CardBody, CardHeader, CardHeading, CardWrapper } from './Card.styled';

type CardProps = {
  type: CardType;
  className?: string;
};

const EmptyCard = React.forwardRef<HTMLDivElement, CardProps>(({ type, className }, ref) => {
  return (
    <CardWrapper ref={ref} dragging={false} bigger={false} className={className}>
      <CardHeader type={type}>
        <CardHeading>pipeline</CardHeading>
      </CardHeader>
      <CardBody></CardBody>
    </CardWrapper>
  );
});

EmptyCard.displayName = 'EmptyCard';

export default EmptyCard;
