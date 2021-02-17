import React from 'react';
import { Box, Button, GlassOverlay, Typography } from '@pipeline/components';
import { RuleMainImage, RulesContainer, RulesOverlayContent } from './RulesOverlay.styled';
import { useTranslate } from '@pipeline/i18n';
import { ReactComponent as ArrowIcon } from '@assets/icons/back-arrow-default.svg';
import { ReactComponent as ArrowHoverIcon } from '@assets/icons/back-arrow-hover.svg';
import { ReactComponent as Rule1Image } from '@assets/images/cards/rule-card-1.svg';
import { ReactComponent as Rule2Image } from '@assets/images/cards/rule-card-2.svg';
import { ReactComponent as Rule3Image } from '@assets/images/cards/rule-card-3.svg';
import { ReactComponent as Rule4Image } from '@assets/images/cards/rule-card-4.svg';
import { ReactComponent as Rule5Image } from '@assets/images/cards/rule-card-5.svg';
import ExpandableRule from '../ExpandableRule';
import useCards from '../../hooks/useCards';
import { CardType } from '@pipeline/common';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const images = {
  '51xgsF43n5iaMNLkxGs1': <Rule1Image />,
  '51xgsF43n5iaMNLkxGs2': <Rule2Image />,
  '51xgsF43n5iaMNLkxGs3': (
    <Box bg="#eeeeee" textAlign="center">
      <Rule3Image />
    </Box>
  ),
  '51xgsF43n5iaMNLkxGs5': <Rule4Image />,
  '51xgsF43n5iaMNLkxGs6': <Rule5Image />,
};

const RulesOverlay: React.FC<Props> = ({ isOpen, close }) => {
  const t = useTranslate();

  const { cards: ruleCards } = useCards(CardType.GameRule);
  const firstGroup = ruleCards.slice(0, Math.ceil(ruleCards.length / 2));
  const secondGroup = ruleCards.slice(Math.ceil(ruleCards.length / 2));

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
                {images[card.id as keyof typeof images] && (
                  <RuleMainImage>{images[card.id as keyof typeof images]}</RuleMainImage>
                )}
                <Typography variant="contentHead">{card.content}</Typography>
              </ExpandableRule>
            ))}
          </Box>
          <Box flex={0.5}>
            {secondGroup.map(card => (
              <ExpandableRule title={card.title} key={card.id}>
                {images[card.id as keyof typeof images] && (
                  <RuleMainImage>{images[card.id as keyof typeof images]}</RuleMainImage>
                )}
                <Typography variant="contentHead">{card.content}</Typography>
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
