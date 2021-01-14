import React, { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GameCreationData } from '../../types/gameCreationData';
import { useTranslate } from '@pipeline/i18n';
import useCards from '../../../gameView/hooks/useCards';
import { CardTypes } from '@pipeline/common';
import ScenariosList from '../ScenariosList';
import { FormTextField } from '@pipeline/form';
import { TextArea } from '@pipeline/components';
import { Button, Link } from '@pipeline/ui-kit';
import { RoutingPath, useNavigateOnCondition } from '@pipeline/routing';
import useCreateGame from '../../hook/useCreateGame';
import { yupResolver } from '@hookform/resolvers/yup';
import { createGameValidationSchema } from '../../utils/validation';

type Props = {};

const CreateGameView: React.FC<Props> = () => {
  const [selectedScenarioCard, setSelectedScenario] = useState<string | null>(null);

  const selectScenario = useCallback((scenarioId: string) => {
    setSelectedScenario(prevState => (scenarioId === prevState ? null : scenarioId));
  }, []);

  const methods = useForm<GameCreationData>({
    defaultValues: {
      scenarioContent: '',
      scenarioTitle: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(createGameValidationSchema),
  });

  const t = useTranslate();

  const { handleSubmit } = methods;

  const { call, success, loading, translatedError } = useCreateGame();

  const { cards } = useCards(CardTypes.Scenario);

  const submit = useMemo(() => {
    if (selectedScenarioCard) {
      const selectedScenario = cards.find(c => c.id === selectedScenarioCard)!;
      return () =>
        call({
          scenarioTitle: selectedScenario.title,
          scenarioContent: selectedScenario.content,
          scenarioCardId: selectedScenario.id,
        });
    } else {
      return handleSubmit((info: GameCreationData) => {
        call(info);
      });
    }
  }, [handleSubmit, call, selectedScenarioCard, cards]);

  const history = useHistory();

  useNavigateOnCondition(success, RoutingPath.Game);

  const cancel = useCallback(() => {
    history.replace(RoutingPath.Dashboard);
  }, [history]);

  return (
    <div className="signup">
      <div
        className="content card"
        style={{ width: '90%', maxWidth: '1000px', background: 'rgba(255,255,255, 0.5)', marginTop: '40px' }}
      >
        <h2>{t('createGame.title')}</h2>
        <h5>{t('createGame.subtitle', { data: { cardsCount: cards.length } })}</h5>
        <FormProvider {...methods}>
          <form>
            <ScenariosList cards={cards} onScenarioSelected={selectScenario} selectedScenario={selectedScenarioCard} />
            <div>
              <h4>{t('createGame.writeYours')}</h4>
              <FormTextField disabled={!!selectedScenarioCard} name="scenarioTitle" label=" " />
              <FormTextField
                disabled={!!selectedScenarioCard}
                CustomInput={TextArea}
                label=" "
                name="scenarioContent"
              />
              <div className="text-center">
                <Button type="primary" onClick={submit}>
                  {t('createGame.createButtonText')}
                </Button>
                {loading && <span>Loading...</span>}
                {translatedError && <span className="error-message">{translatedError}</span>}
              </div>
              <div className="text-center">
                <Link onClick={cancel}>{t('createGame.createButtonText')}</Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

CreateGameView.displayName = 'CreateGameView';

export default CreateGameView;
