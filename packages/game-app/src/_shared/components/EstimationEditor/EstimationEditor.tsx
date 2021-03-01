import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ConfirmButton,
  EstimationInput,
  EstimationInputContainer,
  EstimationInputWrapper,
  EstimationWrapper,
} from './EstimationEditor.styled';
import { useTranslate } from '@pipeline/i18n';

type Props = {
  saveEstimation: (estimation: string) => void;
  initialEstimation?: string | null;
  state: 'opening' | 'open' | 'closed' | 'closing';
  moving: boolean;
  onCloseClick: () => void;
  buttonId?: string;
};

/**
 * Input that appears at the top of the card to edit time estimation
 */
const EstimationEditor: React.FC<Props> = ({
  saveEstimation,
  initialEstimation,
  state,
  moving,
  onCloseClick,
  buttonId,
}) => {
  const [estimation, setEstimation] = useState(initialEstimation || '');

  const t = useTranslate();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimation(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    if (state === 'open') {
      saveEstimation(estimation);
    }
  }, [estimation, saveEstimation, state]);

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick],
  );

  useEffect(() => {
    setEstimation(initialEstimation || '');
  }, [initialEstimation]);

  useEffect(() => {
    if (state === 'open') {
      inputRef?.current?.focus();
    }
  }, [state]);

  return (
    <EstimationWrapper state={state} moving={moving} chars={estimation ? estimation.length : 0}>
      <EstimationInputContainer state={state}>
        <form onSubmit={submit}>
          <EstimationInput
            state={state}
            ref={inputRef}
            maxLength={20}
            WrapperComponent={EstimationInputWrapper}
            value={estimation}
            onChange={onChange}
            placeholder={t('game.estimationPlaceholder')}
            variant="clear"
          />
          <ConfirmButton
            id={buttonId}
            state={state}
            type={state !== 'closed' ? 'submit' : 'button'}
            onClick={state === 'closed' ? onCloseClick : onClick}
          >
            {state === 'closed' ? estimation : null}
          </ConfirmButton>
        </form>
      </EstimationInputContainer>
    </EstimationWrapper>
  );
};
EstimationEditor.displayName = 'EstimationEditor';

export default EstimationEditor;
