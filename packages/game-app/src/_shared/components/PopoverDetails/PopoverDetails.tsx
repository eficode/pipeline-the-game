import React, { useCallback, useMemo, useState } from 'react';
import { ReactComponent as QuestionIcon } from '../../../assets/icons/question.svg';
import { Popover, ArrowContainer, PopoverProps } from 'react-tiny-popover';
import Typography from '../Typography';
import styled from 'styled-components';

type Props = {
  details: string;
};

const PopoverContainer = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  margin-top: 1px;
`;

const PopoverContent = styled.div`
  background-color: white;
  padding: 12px;
  max-width: 140px;
  border-radius: 8px;
  -webkit-box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
`;

const PopoverDetails: React.FC<Props> = ({ details }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPopover = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);

  const position = useMemo(() => {
    return ['right'] as PopoverProps['positions'];
  }, []);

  return (
    <Popover
      padding={10}
      positions={position}
      isOpen={isOpen}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="white"
          arrowSize={10}
        >
          <PopoverContent>
            <Typography fontSize="13px">{details}</Typography>
          </PopoverContent>
        </ArrowContainer>
      )}
    >
      <PopoverContainer onMouseEnter={openPopover} onMouseLeave={closePopover}>
        <QuestionIcon />
      </PopoverContainer>
    </Popover>
  );
};

PopoverDetails.displayName = 'PopoverDetails';

export default PopoverDetails;
