import React from 'react';
import { BottomWidgetsRowContainer, PoweredByContainer, TextLogoWrapper } from './BottomWidgetsRow.styled';
import ScenarioPanel from '../ScenarioPanel';
import { ReactComponent as EficodeTextLogo } from '@assets/images/eficode-text-logo.svg';
import { ReactComponent as LensIcon } from '@assets/icons/zoom.svg';
import { ReactComponent as ZoomInIcon } from '@assets/icons/zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from '@assets/icons/zoom-out.svg';
import { ReactComponent as FitScreenIcon } from '@assets/icons/fit-screen.svg';
import { FabDial, IconButton, Typography } from '@pipeline/components';

type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
  fitWindow: () => void;
};

const BottomWidgetsRowStyled: React.FC<Props> = ({ fitWindow, zoomIn, zoomOut }) => {
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
      <FabDial
        icon={<LensIcon />}
        buttons={[
          {
            icon: <ZoomInIcon />,
            onClick: zoomIn,
          },
          {
            icon: <ZoomOutIcon />,
            onClick: zoomOut,
          },
          {
            icon: <FitScreenIcon />,
            onClick: fitWindow,
          },
        ]}
      />
    </BottomWidgetsRowContainer>
  );
};

BottomWidgetsRowStyled.displayName = 'BottomWidgetsRow';

export default BottomWidgetsRowStyled;
