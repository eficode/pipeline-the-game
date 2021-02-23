import React, { useCallback, useMemo, useRef, useState } from 'react';
import { CardEntity } from '@pipeline/common';
import styled from 'styled-components';
import SelectableScenario from '../SelectableScenario';
import { Box, IconButton } from '@pipeline/components';
import { ReactComponent as RightArrowIcon } from '@assets/icons/arrow.svg';

type Props = {
  cards: CardEntity[];
  onScenarioSelected: (id: string) => void;
  selectedScenario: string | null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  height: 400px;
  padding-top: 20px;
  position: relative;
`;

const LeftArrowIcon = styled(RightArrowIcon)`
  transform: rotate(180deg);
`;

const LeftArrowBox = styled(Box)`
  z-index: 1;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100px;
  padding-left: 2px;
  left: 0;
  top: 0;
  position: absolute;
  background: transparent linear-gradient(90deg, #eeeeee 30px, #e3eeec00 100%) 0 0 no-repeat padding-box;
`;

const RightArrowBox = styled(Box)`
  z-index: 1;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100px;
  padding-right: 2px;
  right: 0;
  top: 0;
  position: absolute;
  background: transparent linear-gradient(270deg, #eeeeee 30px, #e3eeec00 100%) 0 0 no-repeat padding-box;
`;

const HALF_MARGIN = 30;
const CARD_WIDTH = 400;

const ScenariosList: React.FC<Props> = ({ cards, onScenarioSelected, selectedScenario }) => {
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const callbacks = useMemo(() => {
    return cards.map(v => () => onScenarioSelected(v.id));
  }, [cards, onScenarioSelected]);

  const maxScroll = (cards.length - 2) * (CARD_WIDTH + HALF_MARGIN);

  const scrollToRight = useCallback(() => {
    if (scrollRef && scrollRef.current) {
      let nextScroll = scrollLeft + (CARD_WIDTH + HALF_MARGIN);
      if (nextScroll > maxScroll) {
        nextScroll = maxScroll;
      }
      setScrollLeft(nextScroll);
      scrollRef.current.scroll({ left: nextScroll, behavior: 'smooth' });
    }
  }, [scrollRef, scrollLeft, maxScroll]);

  const scrollToLeft = useCallback(() => {
    if (scrollRef && scrollRef.current) {
      let nextScroll = scrollLeft - (CARD_WIDTH + HALF_MARGIN);
      if (nextScroll < 0) {
        nextScroll = 0;
      }
      setScrollLeft(nextScroll);
      scrollRef.current.scroll({ left: nextScroll, behavior: 'smooth' });
    }
  }, [scrollRef, scrollLeft]);

  return (
    <Wrapper>
      {scrollLeft !== 0 && (
        <LeftArrowBox>
          <IconButton variant="clearSmall" onClick={scrollToLeft}>
            <LeftArrowIcon />
          </IconButton>
        </LeftArrowBox>
      )}
      <Box
        height={400}
        alignItems="center"
        overflowX="hidden"
        display="flex"
        flexDirection="row"
        ref={scrollRef}
        flex={1}
        mr={30}
      >
        {cards.map((card, index) => (
          <SelectableScenario
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            onClick={callbacks[index]}
            selected={selectedScenario === card.id}
          />
        ))}
      </Box>
      {scrollLeft < maxScroll && (
        <RightArrowBox>
          <IconButton variant="clearSmall" onClick={scrollToRight}>
            <RightArrowIcon />
          </IconButton>
        </RightArrowBox>
      )}
    </Wrapper>
  );
};

ScenariosList.displayName = 'ScenariosList';

export default ScenariosList;
