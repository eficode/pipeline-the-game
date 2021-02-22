import React, { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GameCreationData } from '../../types/gameCreationData';
import { useTranslate } from '@pipeline/i18n';
import useCards from '../../../gameView/hooks/useCards';
import { CardType } from '@pipeline/common';
import ScenariosList from '../ScenariosList';
import { FormTextField } from '@pipeline/form';
import { Box, Button, ErrorMessage, Link, TextArea, Typography } from '@pipeline/components';
import { RoutingPath, useNavigateOnCondition } from '@pipeline/routing';
import useCreateGame from '../../hook/useCreateGame';
import { yupResolver } from '@hookform/resolvers/yup';
import { createGameValidationSchema } from '../../utils/validation';
import { CreateGameContainer, CreateGameContent } from './CreateGameView.styled';
import { ReactComponent as RightIcon } from '@assets/icons/arrow.svg';

type Props = {};

const CreateGameView: React.FC<Props> = () => {
  const [selectedScenarioCard, setSelectedScenario] = useState<string | null>(null);
  const [isYourOwnVisible, setIsYourOwnVisible] = useState<boolean>();

  const t = useTranslate();

  const methods = useForm<GameCreationData>({
    defaultValues: {
      scenarioContent: '',
      scenarioTitle: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(createGameValidationSchema),
  });

  const { handleSubmit, clearErrors, reset } = methods;

  const selectScenario = useCallback(
    (scenarioId: string) => {
      setIsYourOwnVisible(false);
      setSelectedScenario(prevState => (scenarioId === prevState ? null : scenarioId));
      reset();
      clearErrors();
    },
    [reset, clearErrors],
  );

  const toggleYourOwnVisibility = useCallback(() => {
    setIsYourOwnVisible(v => !v);
    clearErrors();
    reset();
  }, [clearErrors, reset]);

  const { call, success, loading, translatedError, newCreatedId } = useCreateGame();

  const { cards } = useCards(CardType.Scenario);

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
      return handleSubmit(
        (info: GameCreationData) => {
          call(info);
        },
        () => {
          setIsYourOwnVisible(true);
        },
      );
    }
  }, [handleSubmit, call, selectedScenarioCard, cards]);

  const history = useHistory();

  useNavigateOnCondition(success, `${RoutingPath.Game}/${newCreatedId}`);

  const cancel = useCallback(() => {
    history.replace(RoutingPath.Dashboard);
  }, [history]);

  return (
    <CreateGameContainer>
      <CreateGameContent>
        <Box paddingX={20}>
          <Typography variant="dialogHead">{t('createGame.title')}</Typography>
          <Typography variant="content" fontWeight="600">
            {t('createGame.subtitle', { data: { cardsCount: cards.length } })}
          </Typography>
        </Box>
        <FormProvider {...methods}>
          <form>
            <ScenariosList cards={cards} onScenarioSelected={selectScenario} selectedScenario={selectedScenarioCard} />
            <Box mt={3} paddingX={20}>
              <Button
                variant="secondary"
                rightIcon={<RightIcon />}
                label={t('createGame.writeYours')}
                onClick={toggleYourOwnVisibility}
                id="make-your-own"
              />
              {isYourOwnVisible && (
                <>
                  <FormTextField disabled={!!selectedScenarioCard} name="scenarioTitle" />
                  <Box mt={2}>
                    <FormTextField
                      disabled={!!selectedScenarioCard}
                      CustomInput={TextArea}
                      label=" "
                      name="scenarioContent"
                    />
                  </Box>
                </>
              )}
              <Box textAlign="center" mt={4}>
                <Button
                  id="create-game-button"
                  label={t('createGame.createButtonText')}
                  loading={loading}
                  onClick={submit}
                />
                {translatedError && <ErrorMessage message={translatedError} />}
              </Box>
              <Box textAlign="center" mt={2}>
                <Link onClick={cancel}>{t('general.cancel')}</Link>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </CreateGameContent>
    </CreateGameContainer>
  );
};

CreateGameView.displayName = 'CreateGameView';

export default CreateGameView;
