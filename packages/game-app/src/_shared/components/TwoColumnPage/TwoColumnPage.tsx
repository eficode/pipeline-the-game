import React from 'react';
import {
  Column,
  LeftColumn,
  Logo,
  OneColumnContainer,
  RightIllustration,
  TowColumnsContainer,
} from './TwoColumnPage.styled';
import { ReactComponent as Illustration } from '@assets/images/signin-illustration.svg';
import { Typography, Box, TextLogo } from '@pipeline/components';
import { useWindowDimensions } from '../utils';

type Props = {
  left: React.ReactElement;
};

const TwoColumnPage: React.FC<Props> = ({ left }) => {
  const { width } = useWindowDimensions();
  const isWindowTooSmall = width < 800;

  if (isWindowTooSmall) {
    return (
      <OneColumnContainer>
        <Logo>
          <TextLogo />
        </Logo>
        {left}
      </OneColumnContainer>
    );
  }

  return (
    <TowColumnsContainer>
      <Logo>
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
