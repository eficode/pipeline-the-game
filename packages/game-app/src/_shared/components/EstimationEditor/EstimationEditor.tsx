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
};

/**
 * Input that appears at the top of the card to edit time estimation
 */
const EstimationEditor: React.FC<Props> = ({ saveEstimation, initialEstimation }) => {
  const [estimation, setEstimation] = useState(initialEstimation || '');

  const t = useTranslate();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimation(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    saveEstimation(estimation);
  }, [estimation, saveEstimation]);

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick],
  );

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <EstimationWrapper mb={2}>
      <EstimationInputContainer>
        <form onSubmit={submit}>
          <EstimationInput
            ref={inputRef}
            WrapperComponent={EstimationInputWrapper}
            value={estimation}
            onChange={onChange}
            placeholder={t('game.estimationPlaceholder')}
            variant="clear"
          />
          <ConfirmButton type="submit" onClick={onClick} />
        </form>
      </EstimationInputContainer>
    </EstimationWrapper>
  );
};

EstimationEditor.displayName = 'EstimationEditor';

export default EstimationEditor;
