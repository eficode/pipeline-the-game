import React from 'react';
import { Column, LeftColumn, Logo, TowColumnsContainer } from './TowColumnPage.styled';
import { ReactComponent as TextLogo } from '@assets/images/eficode-text-logo.svg';

type Props = {
  left: React.ReactElement;
};

const TowColumnPage: React.FC<Props> = ({ left }) => {
  return (
    <TowColumnsContainer>
      <Logo>
        <TextLogo />
      </Logo>
      <LeftColumn>{left}</LeftColumn>
      <Column flex={0.55}></Column>
    </TowColumnsContainer>
  );
};

TowColumnPage.displayName = 'TowColumnPage';

export default TowColumnPage;
