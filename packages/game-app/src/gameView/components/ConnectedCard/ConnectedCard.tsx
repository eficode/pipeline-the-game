import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { Card } from '@pipeline/components';

type Props = {
  id: string;
  dragging?: boolean;
  bigger?: boolean;
};

const ConnectedCard: React.FC<Props> = ({ id, dragging, bigger }) => {
  const cardData = useSelector(selectors.getCardById(id))!;

  return <Card {...cardData} dragging={dragging} bigger={bigger} />;
};

ConnectedCard.displayName = 'ConnectedCard';

export default ConnectedCard;
