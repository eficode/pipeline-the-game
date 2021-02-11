import React from 'react';
import { Box, Button, GlassOverlay, Typography } from '@pipeline/components';
import { RulesContainer, RulesOverlayContent } from './RulesOverlay.styled';
import { useTranslate } from '@pipeline/i18n';
import { ReactComponent as ArrowIcon } from '@assets/icons/back-arrow-default.svg';
import { ReactComponent as ArrowHoverIcon } from '@assets/icons/back-arrow-hover.svg';
import ExpandableRule from '../ExpandableRule';
import useCards from '../../hooks/useCards';
import { CardType } from '@pipeline/common';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const RulesOverlay: React.FC<Props> = ({ isOpen, close }) => {
  const t = useTranslate();

  const { cards: ruleCards } = useCards(CardType.GameRule);
  const firstGroup = ruleCards.slice(0, Math.floor(ruleCards.length / 2));
  const secondGroup = ruleCards.slice(Math.floor(ruleCards.length / 2));

  return (
    <GlassOverlay open={isOpen}>
      <RulesOverlayContent>
        <Box>
          <Button
            variant="clear"
            onClick={close}
            leftIconHover={<ArrowHoverIcon />}
            leftIcon={<ArrowIcon />}
            label={t('game.backToGame')}
          />
        </Box>
        <Typography as="h1" color="white" variant="bigTitle">
          {' '}
          {t('game.rules')}
        </Typography>
        <RulesContainer>
          <Box flex={0.5} marginRight={3}>
            {firstGroup.map(card => (
              <ExpandableRule title={card.title} key={card.id}>
                {card.content}
              </ExpandableRule>
            ))}
          </Box>
          <Box flex={0.5}>
            {secondGroup.map(card => (
              <ExpandableRule title={card.title} key={card.id}>
                {card.content}
              </ExpandableRule>
            ))}
          </Box>
        </RulesContainer>
      </RulesOverlayContent>
    </GlassOverlay>
  );
};

RulesOverlay.displayName = 'RulesOverlay';

export default RulesOverlay;
