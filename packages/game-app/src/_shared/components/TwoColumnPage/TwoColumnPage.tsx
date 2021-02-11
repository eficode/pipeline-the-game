import React from 'react';
import { Column, LeftColumn, Logo, TowColumnsContainer } from './TwoColumnPage.styled';
import { ReactComponent as TextLogo } from '@assets/images/eficode-text-logo.svg';

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
      <Column flex={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center"></Column>
    </TowColumnsContainer>
  );
};

TwoColumnPage.displayName = 'TowColumnPage';

export default TwoColumnPage;
