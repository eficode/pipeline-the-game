import React from 'react';
import { Column, LeftColumn, Logo, RightIllustration, TowColumnsContainer } from './TwoColumnPage.styled';
import { ReactComponent as TextLogo } from '@assets/images/eficode-text-logo.svg';
import { ReactComponent as Illustration } from '@assets/images/signin-illustration.svg';

type Props = {
  left: React.ReactElement;
};

const TwoColumnPage: React.FC<Props> = ({ left }) => {
  return (
    <TowColumnsContainer>
      <Logo>
        <TextLogo />
      </Logo>
      <LeftColumn>{left}</LeftColumn>
      <Column flex={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <RightIllustration>
          <Illustration />
        </RightIllustration>
      </Column>
    </TowColumnsContainer>
  );
};

TwoColumnPage.displayName = 'TowColumnPage';

export default TwoColumnPage;
