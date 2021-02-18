import React, { useCallback, useEffect, useState } from 'react';
import { ButtonsBar, GameName, LogoContainer, TopRowContainer } from './TopWidgetsRow.styled';
import { ReactComponent as Logo } from '@assets/images/eficode-logo.svg';
import { ReactComponent as ExitIcon } from '@assets/icons/exit.svg';
import { ReactComponent as ShareIcon } from '@assets/icons/share.svg';
import { ReactComponent as RulesIcon } from '@assets/icons/rules.svg';
import { ReactComponent as TriggerReviewIcon } from '@assets/icons/review.svg';
import { Button, IconButton, Typography, useDialog } from '@pipeline/components';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';
import { useTranslate } from '@pipeline/i18n';
import ShareGameDialog from '../ShareGameDialog';
import RulesOverlay from '../RulesOverlay';
import TriggerReviewDialog from '../TriggerReviewDialog';
import ConfirmExitDialog from '../ConfirmExitDialog';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';

type Props = {};

const TopWidgetsRow: React.FC<Props> = () => {
  const history = useHistory();
  const game = useSelector(selectors.getGame);

  const shareDialog = useDialog();
  const rulesOverlay = useDialog();
  const triggerReviewOverlay = useDialog();
  const confirmExitDialog = useDialog();

  const t = useTranslate();

  const { close: closeConfirmExitDialog } = confirmExitDialog;

  const isUserTheFacilitator = useSelector(selectors.getIsUserTheFacilitator);

  const exitGame = useCallback(() => {
    history.replace(RoutingPath.Dashboard);
    closeConfirmExitDialog();
  }, [closeConfirmExitDialog, history]);

  const review = useSelector(selectors.getReview);

  const [currentReview, setCurrentReview] = useState(review);

  const openReviewDialog = triggerReviewOverlay.open;

  useEffect(() => {
    if (review && !currentReview && !isUserTheFacilitator) {
      setCurrentReview(true);
      openReviewDialog();
    } else if (!review) {
      setCurrentReview(false);
    }
  }, [review, isUserTheFacilitator, currentReview, openReviewDialog]);

  // TODO
  const contactUs = () => ({});

  return (
    <>
      <TopRowContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <ButtonsBar>
          {game && (
            <GameName>
              <Typography>
                {t('game.id')}
                {game.name}
              </Typography>
            </GameName>
          )}
          <IconButton
            id="exit-game"
            variant="clear"
            onClick={confirmExitDialog.open}
            tooltipLabel={t('game.toolbar.exitTooltip')}
          >
            <ExitIcon />
          </IconButton>
          <IconButton
            id="share-game"
            variant="clear"
            onClick={shareDialog.open}
            tooltipLabel={t('game.toolbar.shareTooltip')}
          >
            <ShareIcon />
          </IconButton>

          <IconButton
            id="show-rules-button"
            variant="clear"
            onClick={rulesOverlay.toggle}
            tooltipLabel={t('game.toolbar.rulesTooltip')}
          >
            <RulesIcon />
          </IconButton>

          {isUserTheFacilitator && (
            <IconButton
              variant="clear"
              onClick={triggerReviewOverlay.open}
              tooltipLabel={t('game.toolbar.reviewTooltip')}
            >
              <TriggerReviewIcon />
            </IconButton>
          )}
        </ButtonsBar>
        <Button onClick={contactUs} label={t('game.contactUs')} />
      </TopRowContainer>
      <ShareGameDialog isOpen={shareDialog.isOpen} close={shareDialog.close} />
      <RulesOverlay isOpen={rulesOverlay.isOpen} close={rulesOverlay.close} />
      <TriggerReviewDialog
        isOpen={triggerReviewOverlay.isOpen}
        straightToPosition={!isUserTheFacilitator}
        inReview={!!review}
        close={triggerReviewOverlay.close}
      />
      <ConfirmExitDialog isOpen={confirmExitDialog.isOpen} close={confirmExitDialog.close} exitGame={exitGame} />
    </>
  );
};

TopWidgetsRow.displayName = 'TopWidgetsRow';

export default TopWidgetsRow;
