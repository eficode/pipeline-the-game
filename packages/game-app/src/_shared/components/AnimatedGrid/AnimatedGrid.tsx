import React, { Children, useCallback } from 'react';
import { calculateCoordinates, calculateItemPosition, calculateItemsPerRow } from './animatedGridUtils';
import { AnimatedGridContainer } from './AnimatedGrid.styled';

type Props = {
  /**
   * the width of the grid container
   */
  containerWidth: number;
  /**
   * width of the element inside the grid
   */
  itemWidth: number;
  /**
   * height of the element inside the grid
   */
  itemHeight: number;
  /**
   * margin between elements
   */
  margin: number;
  /**
   * vertical margin between elements if it is different from the margin
   */
  marginVertical: number;
  /**
   * class applied to the child elements
   */
  childClassName?: string;
  /**
   * class applied to the grid container
   */
  className?: string;
  transitionTime?: string;
  transitionTimingFunction?: string;
  children: React.ReactChild[];
};

/**
 * Component that calculates absolute position inside the grid given the margin and the
 * exact width and height of the elements, the position is then animated between
 * rendering. Each children must heave a unique key so that the transition
 * between to rendering can be created.
 */
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
    let elementsPerRow = calculateItemsPerRow(itemWidth, margin, containerWidth);
    if (elementsPerRow < 1) {
      elementsPerRow = 1;
    }
    const newMargin = margin;
    return Children.map(children, (child, index) => {
      const { row, col } = calculateItemPosition(index, elementsPerRow);
      const { top, left } = calculateCoordinates(row, col, itemWidth, itemHeight, newMargin, marginVertical);
      return renderChild(child as React.ReactElement, top, left);
    });
  }, [children, containerWidth, itemHeight, itemWidth, margin, marginVertical, renderChild]);

  return <AnimatedGridContainer className={className}>{parseChildren()}</AnimatedGridContainer>;
};

AnimatedGrid.displayName = 'AnimatedGrid';

export default React.memo(AnimatedGrid);
