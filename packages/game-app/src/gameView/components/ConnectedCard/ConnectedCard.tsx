import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { Card } from '@pipeline/components';

type Props = {
  id: string;
  dragging?: boolean;
};

const ConnectedCard: React.FC<Props> = ({ id, dragging }) => {
  const cardData = useSelector(selectors.getCardById(id))!;

  return <Card {...cardData} dragging={dragging} />;
};

ConnectedCard.displayName = 'ConnectedCard';

export default ConnectedCard;
