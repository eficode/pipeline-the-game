import React from 'react';
import { BottomWidgetsRowContainer, PoweredByContainer, TextLogoWrapper } from './BottomWidgetsRow.styled';
import ScenarioPanel from '../ScenarioPanel';
import { ReactComponent as EficodeTextLogo } from '@assets/images/eficode-text-logo.svg';
import { Typography } from '@pipeline/components';

type Props = {};

const BottomWidgetsRowStyled: React.FC<Props> = () => {
  return (
    <BottomWidgetsRowContainer>
      <ScenarioPanel />
      <PoweredByContainer>
        <Typography variant="label" color="#9F998F" as="span">
          Powered By
        </Typography>
        <TextLogoWrapper>
          <EficodeTextLogo />
        </TextLogoWrapper>
      </PoweredByContainer>
    </BottomWidgetsRowContainer>
  );
};

BottomWidgetsRowStyled.displayName = 'BottomWidgetsRow';

export default BottomWidgetsRowStyled;
