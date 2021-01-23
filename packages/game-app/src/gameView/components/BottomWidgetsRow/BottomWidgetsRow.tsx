import React, { useCallback } from 'react';
import { BottomWidgetsRowContainer, PoweredByContainer, TextLogoWrapper } from './BottomWidgetsRow.styled';
import ScenarioPanel from '../ScenarioPanel';
import { ReactComponent as EficodeTextLogo } from '@assets/images/eficode-text-logo.svg';
import { ReactComponent as LensIcon } from '@assets/icons/zoom.svg';
import { ReactComponent as ZoomInIcon } from '@assets/icons/zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from '@assets/icons/zoom-out.svg';
import { ReactComponent as FitScreenIcon } from '@assets/icons/fit-screen.svg';
import { FabDial, Typography } from '@pipeline/components';
import { useZoomPanRefs } from '../ZoomPanContext';
import { calculatePanAndZoomToFitWindow } from '../../utils/fitToWindow';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';

type Props = {};

const BottomWidgetsRowStyled: React.FC<Props> = () => {
  const state = useSelector(selectors.getCardStateForUI);

  const { setScaleAndPanRef } = useZoomPanRefs();

  const fitWindow = useCallback(() => {
    const { actualScale, pan } = calculatePanAndZoomToFitWindow(state);
    setScaleAndPanRef.current?.({
      scale: actualScale,
      pan: pan,
    });
  }, [setScaleAndPanRef, state]);

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
            onClick: () => ({}),
          },
          {
            icon: <ZoomOutIcon />,
            onClick: () => ({}),
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
