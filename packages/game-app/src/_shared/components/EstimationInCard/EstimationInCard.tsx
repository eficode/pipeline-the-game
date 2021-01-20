import React from 'react';
import { EstimationCardContent } from './EstimationInCard.styled';

type Props = {
  estimation: string;
};

/**
 * Component to show estimation inside the card
 */
const EstimationInCard: React.FC<Props> = ({ estimation }) => {
  return <EstimationCardContent>{estimation}</EstimationCardContent>;
};

EstimationInCard.displayName = 'EstimationInCard';

export default EstimationInCard;
