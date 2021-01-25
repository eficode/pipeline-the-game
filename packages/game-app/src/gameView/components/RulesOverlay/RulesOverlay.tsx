import React from 'react';
import { Box, Button, Typography, GlassOverlay } from '@pipeline/components';
import { RulesContainer } from './RulesOverlay.styled';
import { useTranslate } from '@pipeline/i18n';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import ExpandableRule from '../ExpandableRule';

type Props = {
  isOpen: boolean;
  close: () => void;
};

// todo insert real game rules content
const RulesOverlay: React.FC<Props> = ({ isOpen, close }) => {
  const t = useTranslate();

  return (
    <GlassOverlay open={isOpen}>
      <RulesContainer>
        <Box>
          <Button variant="clear" onClick={close} leftIcon={<ArrowIcon />} label={t('game.backToGame')} />
        </Box>
        <Typography as="h1" color="white" variant="bigTitle">
          {' '}
          {t('game.rules')}
        </Typography>
        <Box display="flex" flexDirection="row" width="80%" margin="auto" marginTop="100px">
          <Box flex={0.5} marginRight={3}>
            <ExpandableRule title="Delivery Pipeline Start & End">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </ExpandableRule>
            <ExpandableRule title="Delivery Pipeline Start & End">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </ExpandableRule>
            <ExpandableRule title="Delivery Pipeline Start & End">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </ExpandableRule>
          </Box>
          <Box flex={0.5}>
            <ExpandableRule title="Delivery Pipeline Start & End">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </ExpandableRule>
            <ExpandableRule title="Delivery Pipeline Start & End">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </ExpandableRule>
            <ExpandableRule title="Delivery Pipeline Start & End">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua
            </ExpandableRule>
          </Box>
        </Box>
      </RulesContainer>
    </GlassOverlay>
  );
};

RulesOverlay.displayName = 'RulesOverlay';

export default RulesOverlay;
