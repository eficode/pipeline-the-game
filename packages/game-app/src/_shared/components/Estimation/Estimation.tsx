import React, { useEffect, useState } from 'react';
import EstimationEditor from '../EstimationEditor';

type Props = {
  open: boolean;
  saveEstimation: (estimation: string) => void;
  initialEstimation?: string | null;
};

function useOpeningTransaction(open: boolean, timing = 500) {
  const [internalState, setInternalState] = useState<'opening' | 'open' | 'closed' | 'closing'>(
    open ? 'open' : 'closed',
  );

  useEffect(() => {
    if (!open && internalState === 'open') {
      setInternalState('closing');
      setTimeout(() => {
        setInternalState('closed');
      }, timing);
    } else if (open && internalState !== 'open') {
      setInternalState('opening');
      setTimeout(() => {
        setInternalState('open');
      }, timing);
    }
  }, [internalState, open, timing]);

  return internalState;
}

const Estimation: React.FC<Props> = ({ open, initialEstimation, saveEstimation }) => {
  const state = useOpeningTransaction(open, 1100);

  return state === 'closed' && !initialEstimation ? null : (
    <EstimationEditor state={state} saveEstimation={saveEstimation} initialEstimation={initialEstimation} />
  );
};

Estimation.displayName = 'Estimation';

export default Estimation;
