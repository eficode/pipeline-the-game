import React, { useCallback, useMemo } from 'react';
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
import ReviewPanel from '../ReviewPanel';
import { useTranslate } from '@pipeline/i18n';

type Props = {};

const BottomWidgetsRowStyled: React.FC<Props> = () => {
  const state = useSelector(selectors.getCardStateForUI);
  const review = useSelector(selectors.getReview);
  const t = useTranslate();

  const { setScaleAndPanRef, zoomRef } = useZoomPanRefs();

  const fitWindow = useCallback(() => {
    try {
      let { actualScale, pan } = calculatePanAndZoomToFitWindow(state);
      setScaleAndPanRef.current?.({
        scale: actualScale,
        pan: pan,
      });
    } catch (e) {
      // in case of exception for example no card placed, do nothing
    }
  }, [setScaleAndPanRef, state]);

  const zoomIn = useCallback(() => {
    zoomRef.current?.(1.1);
  }, [zoomRef]);

  const zoomOut = useCallback(() => {
    zoomRef.current?.(0.9);
  }, [zoomRef]);

  const buttons = useMemo(
    () => [
      {
        icon: <ZoomInIcon />,
        onClick: zoomIn,
        tooltipLabel: t('game.dial.zoomInTooltip'),
      },
      {
        icon: <ZoomOutIcon />,
        onClick: zoomOut,
        tooltipLabel: t('game.dial.zoomOutTooltip'),
      },
      {
        icon: <FitScreenIcon />,
        onClick: fitWindow,
        autoClose: true,
        tooltipLabel: t('game.dial.fitTooltip'),
      },
    ],
    [fitWindow, t, zoomIn, zoomOut],
  );

  return (
    <BottomWidgetsRowContainer>
      <ScenarioPanel />
      {review && <ReviewPanel />}
      <PoweredByContainer>
        <Typography variant="label" color="#9F998F" as="span">
          Powered By
        </Typography>
        <TextLogoWrapper>
          <EficodeTextLogo />
        </TextLogoWrapper>
      </PoweredByContainer>
      <FabDial icon={<LensIcon />} buttons={buttons} />
    </BottomWidgetsRowContainer>
  );
};

BottomWidgetsRowStyled.displayName = 'BottomWidgetsRow';

export default BottomWidgetsRowStyled;
