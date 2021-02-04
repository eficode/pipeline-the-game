import React from 'react';
import { EstimationCardContent } from './EstimationInCard.styled';

type Props = {
  estimation: string;
  moving?: boolean;
};

/**
 * Component to show estimation inside the card
 */
const EstimationInCard: React.FC<Props> = ({ estimation, moving }) => {
  return <EstimationCardContent moving={moving}>{estimation}</EstimationCardContent>;
};

EstimationInCard.displayName = 'EstimationInCard';

export default EstimationInCard;
