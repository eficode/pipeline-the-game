import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { Card } from '@pipeline/components';

type Props = {
  id: string;
};

const ConnectedCard: React.FC<Props> = ({ id }) => {
  const cardData = useSelector(selectors.getCardById(id))!;

  return <Card {...cardData} />;
};

ConnectedCard.displayName = 'ConnectedCard';

export default ConnectedCard;
