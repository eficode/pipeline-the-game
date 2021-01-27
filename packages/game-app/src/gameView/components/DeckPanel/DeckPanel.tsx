import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DraggableCard from '../DraggableCard';
import { AnimatedGrid, IconButton, Input } from '@pipeline/components';
import { ReactComponent as StackedIcon } from '@assets/icons/stacked-view.svg';
import { ReactComponent as TwoColumnsIcon } from '@assets/icons/two-column-view.svg';
import DroppablePanelArea from '../DroppablePanelArea';
import { PANEL_CARD_SIZE, PANEL_ONE_COLUMNS_WIDTH, PANEL_TWO_COLUMNS_WIDTH } from '../../../dimensions';
import { AnimatedChild, DeckPanelContent, PanelButtons, PanelTools } from './DeckPanel.styled';
import { ReactComponent as SearchIcon, ReactComponent as ClearIcon } from '@assets/icons/zoom.svg';
import useDeckState from '../../hooks/useDeckState';

export type PanelMode = 'stacked' | 'tow-columns';

type Props = {
  panelModeRef: React.MutableRefObject<PanelMode>;
};

const DeckPanel: React.FC<Props> = ({ panelModeRef }) => {
  const [panelMode, setPanelMode] = useState<PanelMode>('stacked');
  const { searchedText, setSearchedText, deckCardsIds } = useDeckState();

  useEffect(() => {
    panelModeRef.current = panelMode;
  }, [panelMode, panelModeRef]);

  const clearText = useCallback(() => {
    setSearchedText('');
  }, [setSearchedText]);

  const changeSearchedText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchedText(e.target.value);
    },
    [setSearchedText],
  );

  const setStacked = useCallback(() => {
    setPanelMode('stacked');
  }, []);

  const setTowColumns = useCallback(() => {
    setPanelMode('tow-columns');
  }, []);

  const content = useMemo(
    () => (
      <AnimatedGrid
        itemWidth={PANEL_CARD_SIZE.width}
        itemHeight={PANEL_CARD_SIZE.height}
        margin={16}
        marginVertical={panelMode === 'tow-columns' ? 16 : -90}
        containerWidth={panelMode === 'tow-columns' ? PANEL_TWO_COLUMNS_WIDTH - 80 : PANEL_ONE_COLUMNS_WIDTH - 80}
        ChildComponent={AnimatedChild}
        transitionTime="400ms"
        transitionTimingFunction="ease-in-out"
      >
        {deckCardsIds.map(id => (
          <DraggableCard bigger key={id} id={id} />
        ))}
      </AnimatedGrid>
    ),
    [deckCardsIds, panelMode],
  );

  return (
    <DroppablePanelArea mode={panelMode}>
      <PanelTools>
        <Input
          variant="clearRound"
          value={searchedText}
          iconLeft={<SearchIcon />}
          onChange={changeSearchedText}
          iconRight={
            searchedText && (
              <IconButton variant="clearSmall" onClick={clearText}>
                <ClearIcon />
              </IconButton>
            )
          }
        />
        <PanelButtons>
          <IconButton active={panelMode === 'stacked'} onClick={setStacked}>
            <StackedIcon />
          </IconButton>
          <IconButton active={panelMode === 'tow-columns'} onClick={setTowColumns}>
            <TwoColumnsIcon />
          </IconButton>
        </PanelButtons>
      </PanelTools>
      <DeckPanelContent mode={panelMode}>{content}</DeckPanelContent>
    </DroppablePanelArea>
  );
};

DeckPanel.displayName = 'Panel';

export default React.memo(DeckPanel);
