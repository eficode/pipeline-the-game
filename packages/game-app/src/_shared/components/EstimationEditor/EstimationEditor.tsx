import React, { useCallback, useState } from 'react';
import { ConfirmButton, EstimationInput, EstimationInputContainer, EstimationWrapper } from './EstimationEditor.styled';

type Props = {
  saveEstimation: (estimation: string) => void;
  initialEstimation?: string;
};

/**
 * Input that appears at the top of the card to edit time estimation
 */
const EstimationEditor: React.FC<Props> = ({ saveEstimation, initialEstimation }) => {
  const [estimation, setEstimation] = useState(initialEstimation || '');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimation(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    saveEstimation(estimation);
  }, [estimation, saveEstimation]);

  return (
    <EstimationWrapper mb={2}>
      <EstimationInputContainer>
        <EstimationInput value={estimation} onChange={onChange} placeholder={'Write time estimation'} variant="clear" />
        <ConfirmButton onClick={onClick} />
      </EstimationInputContainer>
    </EstimationWrapper>
  );
};

EstimationEditor.displayName = 'EstimationEditor';

export default EstimationEditor;
