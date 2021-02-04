import React from 'react';
import ConnectedCard from '../ConnectedCard';
import { EstimationInCard } from '@pipeline/components';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { MovingCardWrapper } from './MovingCard.styled';

type Props = {
  id: string;
  bigger: boolean;
};

const MovingCard: React.FC<Props> = ({ id, bigger }) => {
  const { estimation } = useSelector(selectors.getCardAdditionalInfo(id));

  return (
    <MovingCardWrapper bigger={bigger} dragging={true} data-cy={`moving-card-${id}`}>
      {estimation && <EstimationInCard estimation={estimation} />}
      <ConnectedCard dragging={true} id={id} />
    </MovingCardWrapper>
  );
};

MovingCard.displayName = 'MovingCard';

export default MovingCard;
