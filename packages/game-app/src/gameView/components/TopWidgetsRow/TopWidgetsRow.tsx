import React from 'react';
import { ButtonsBar, LogoContainer, TopRowContainer } from './TopWidgetsRow.styled';
import { ReactComponent as Logo } from '@assets/images/eficode-logo.svg';
import { ReactComponent as ExitIcon } from '@assets/icons/exit.svg';
import { ReactComponent as ShareIcon } from '@assets/icons/share.svg';
import { ReactComponent as RulesIcon } from '@assets/icons/rules.svg';
import { ReactComponent as TriggerReviewIcon } from '@assets/icons/review.svg';
import { Button, IconButton } from '@pipeline/components';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from '@pipeline/routing';
import { useTranslate } from '@pipeline/i18n';

type Props = {};

const TopWidgetsRow: React.FC<Props> = () => {
  const history = useHistory();

  const t = useTranslate();

  const exitGame = () => history.replace(RoutingPath.Dashboard);

  // TODO
  const share = () => ({});
  // TODO
  const showRules = () => ({});
  // TODO
  const triggerReview = () => ({});
  // TODO
  const contactUs = () => ({});

  return (
    <TopRowContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <ButtonsBar>
        <IconButton variant="clear" onClick={exitGame}>
          <ExitIcon />
        </IconButton>
        <IconButton variant="clear" onClick={share}>
          <ShareIcon />
        </IconButton>

        <IconButton variant="clear" onClick={showRules}>
          <RulesIcon />
        </IconButton>

        <IconButton variant="clear" onClick={triggerReview}>
          <TriggerReviewIcon />
        </IconButton>
      </ButtonsBar>
      <Button onClick={contactUs} label={t('game.contactUs')} />
    </TopRowContainer>
  );
};

TopWidgetsRow.displayName = 'TopWidgetsRow';

export default TopWidgetsRow;
