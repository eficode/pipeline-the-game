import React, { Children, useCallback } from 'react';
import { calculateCoordinates, calculateItemPosition, calculateItemsPerRow } from './animatedGridUtils';

type Props = {
  containerWidth: number;
  itemWidth: number;
  itemHeight: number;
  margin: number;
  marginVertical: number;
  childClassName?: string;
  className?: string;
  transitionTime?: string;
  transitionTimingFunction?: string;
  children: React.ReactChild[];
};

const AnimatedGrid: React.FC<Props> = ({
  margin,
  children,
  childClassName,
  className,
  containerWidth,
  itemHeight,
  itemWidth,
  marginVertical,
  transitionTime = '400ms',
  transitionTimingFunction = 'ease-out',
}) => {
  const getChildStyles = useCallback(
    (top: number, left: number) => {
      return {
        position: 'absolute' as const,
        top: `${top}px`,
        left: `${left}px`,
        transition: `${transitionTime} top ${transitionTimingFunction}, ${transitionTime} left ${transitionTimingFunction}`,
      };
    },
    [transitionTime, transitionTimingFunction],
  );

  const renderChild = useCallback(
    (child: React.ReactElement, top: number = 0, left: number = 0) => {
      return (
        <div className={childClassName} key={child.key} style={getChildStyles(top, left)}>
          {child}
        </div>
      );
    },
    [childClassName, getChildStyles],
  );

  const parseChildren = useCallback(() => {
    const elementsPerRow = calculateItemsPerRow(itemWidth, margin, containerWidth);
    const newMargin = margin;
    return Children.map(children, (child, index) => {
      const { row, col } = calculateItemPosition(index, elementsPerRow);
      const { top, left } = calculateCoordinates(row, col, itemWidth, itemHeight, newMargin, marginVertical);
      return renderChild(child as React.ReactElement, top, left);
    });
  }, [children, containerWidth, itemHeight, itemWidth, margin, marginVertical, renderChild]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {parseChildren()}
    </div>
  );
};

AnimatedGrid.displayName = 'AnimatedGrid';

export default React.memo(AnimatedGrid);
