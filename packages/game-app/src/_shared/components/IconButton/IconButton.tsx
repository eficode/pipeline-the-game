import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { IconButtonVariants, IconTooltip, StyledButton } from './IconButton.styled';
import { Popover, PopoverPosition } from 'react-tiny-popover';

type Props = {
  onClick: () => void;
  className?: string;
  active?: boolean;
  variant?: IconButtonVariants;
  id?: string;
  testId?: string;
  tooltipLabel?: React.ReactNode;
  tooltipPosition?: Exclude<PopoverPosition, 'custom'>;
};

const IconButton: React.FC<Props> = ({
  children,
  onClick,
  className,
  active,
  variant = 'default',
  id,
  testId,
  tooltipLabel,
  tooltipPosition,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openPopover = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);

  const positions = useMemo(() => {
    return tooltipPosition ? [tooltipPosition] : ['bottom' as const, 'left' as const, 'right' as const];
  }, [tooltipPosition]);

  return (
    <Popover
      isOpen={isOpen && !!tooltipLabel}
      padding={8}
      positions={positions} // preferred positions by priority
      content={<IconTooltip>{tooltipLabel}</IconTooltip>}
    >
      <StyledButton
        id={id}
        data-cy={testId || id}
        type="button"
        variant={variant}
        onClick={onClick}
        className={className}
        active={active}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
      >
        {children}
      </StyledButton>
    </Popover>
  );
};

IconButton.displayName = 'IconButton';

export default styled(IconButton)``;
