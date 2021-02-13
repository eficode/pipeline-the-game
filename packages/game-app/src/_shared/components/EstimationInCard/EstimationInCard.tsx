import React from 'react';
import { EstimationCardContent } from './EstimationInCard.styled';

type Props = {
  estimation: string;
  id?: string;
  onClick?: () => void;
  moving?: boolean;
};

/**
 * Component to show estimation inside the card
 */
const EstimationInCard: React.FC<Props> = ({ estimation, onClick, moving, id }) => {
  return (
    <EstimationCardContent id={id} onClick={onClick} moving={moving}>
      {estimation}
    </EstimationCardContent>
  );
};

EstimationInCard.displayName = 'EstimationInCard';

export default EstimationInCard;
