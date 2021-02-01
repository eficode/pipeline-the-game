import React, { useCallback } from 'react';
import { ButtonsBar, LogoContainer, TopRowContainer } from './TopWidgetsRow.styled';
import { ReactComponent as Logo } from '@assets/images/eficode-logo.svg';
import { ReactComponent as ExitIcon } from '@assets/icons/exit.svg';
import { ReactComponent as ShareIcon } from '@assets/icons/share.svg';
import { ReactComponent as RulesIcon } from '@assets/icons/rules.svg';
import { ReactComponent as TriggerReviewIcon } from '@assets/icons/review.svg';
import { Button, IconButton, useDialog } from '@pipeline/components';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';
import { useTranslate } from '@pipeline/i18n';
import ShareGameDialog from '../ShareGameDialog';
import RulesOverlay from '../RulesOverlay';
import TriggerReviewDialog from '../TriggerReviewDialog';
import ConfirmExitDialog from '../ConfirmExitDialog';

type Props = {
  toggleBackGround: () => void;
};

const TopWidgetsRow: React.FC<Props> = ({ toggleBackGround }) => {
  const history = useHistory();

  const shareDialog = useDialog();
  const rulesOverlay = useDialog();
  const triggerReviewOverlay = useDialog();
  const confirmExitDialog = useDialog();

  const t = useTranslate();

  const { close: closeConfirmExitDialog } = confirmExitDialog;

  const exitGame = useCallback(() => {
    history.replace(RoutingPath.Dashboard);
    closeConfirmExitDialog();
  }, [closeConfirmExitDialog, history]);

  // TODO
  const contactUs = () => ({});

  return (
    <>
      <TopRowContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <ButtonsBar>
          <IconButton testId="exit-game" variant="clear" onClick={confirmExitDialog.open}>
            <ExitIcon />
          </IconButton>
          <IconButton variant="clear" onClick={shareDialog.open}>
            <ShareIcon />
          </IconButton>

          <IconButton variant="clear" onClick={rulesOverlay.toggle}>
            <RulesIcon />
          </IconButton>

          <IconButton variant="clear" onClick={triggerReviewOverlay.open}>
            <TriggerReviewIcon />
          </IconButton>
        </ButtonsBar>
        <Button onClick={contactUs} label={t('game.contactUs')} />
      </TopRowContainer>
      <ShareGameDialog isOpen={shareDialog.isOpen} close={shareDialog.close} />
      <RulesOverlay isOpen={rulesOverlay.isOpen} close={rulesOverlay.close} />
      <TriggerReviewDialog isOpen={triggerReviewOverlay.isOpen} close={triggerReviewOverlay.close} />
      <ConfirmExitDialog isOpen={confirmExitDialog.isOpen} close={confirmExitDialog.close} exitGame={exitGame} />
    </>
  );
};

TopWidgetsRow.displayName = 'TopWidgetsRow';

export default TopWidgetsRow;
