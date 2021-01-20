import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import AnimatedGrid from './AnimatedGrid';
import styled from 'styled-components';

export default {
  title: 'Components/Animated Grid',
  component: AnimatedGrid,
  argTypes: {},
} as Meta;

const elements = new Array(15).fill(null).map((value, index) => index);

const GridContainer = styled.div`
  padding: 8px;
  width: ${200 + 8 * 4 + 16}px;
  height: 300px;
  overflow: scroll;
  background: #9a9a9a;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Template: Story<React.ComponentProps<typeof AnimatedGrid>> = args => {
  const [state, setState] = useState(elements);

  const removeRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * state.length);
    const newState = [...state];

    newState.splice(randomIndex, 1);

    setState(newState);
  };

  return (
    <div>
      <button onClick={removeRandomElement}>Remove random element</button>
      <GridContainer>
        <AnimatedGrid margin={8} itemHeight={50} itemWidth={50} containerWidth={200 + 8 * 4} marginVertical={8}>
          {state.map(value => (
            <div key={value} style={{ width: '50px', height: '50px', background: 'white' }}>
              id {value}
            </div>
          ))}
        </AnimatedGrid>
      </GridContainer>
    </div>
  );
};

export const Grid = Template.bind({});

Grid.args = {};
