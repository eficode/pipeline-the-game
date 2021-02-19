import React from 'react';
import { Column, LeftColumn, Logo, RightIllustration, TowColumnsContainer } from './TwoColumnPage.styled';
import { ReactComponent as TextLogo } from '@assets/images/eficode-text-logo.svg';
import { ReactComponent as Illustration } from '@assets/images/signin-illustration.svg';
import { Typography, Box } from '@pipeline/components';
import { useNavigateOutsideTo } from '@pipeline/routing';
import { ExternalUrl } from '@pipeline/models';

type Props = {
  left: React.ReactElement;
};

const TwoColumnPage: React.FC<Props> = ({ left }) => {
  const goToPipeline = useNavigateOutsideTo(ExternalUrl.PIPELINE, true);

  return (
    <TowColumnsContainer>
      <Logo onClick={goToPipeline}>
        <TextLogo />
      </Logo>
      <LeftColumn>{left}</LeftColumn>
      <Column flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <RightIllustration>
          <Illustration />
        </RightIllustration>
        <Box mt={16}>
          <Typography variant="bigTitle" fontWeight="800">
            Pipeline
          </Typography>
        </Box>
        <Typography variant="dialogHead" fontWeight="800">
          The game that delivers!
        </Typography>
      </Column>
    </TowColumnsContainer>
  );
};

TwoColumnPage.displayName = 'TwoColumnPage';

export default TwoColumnPage;
