import React from 'react';
import { Meta, Story } from '@storybook/react';

import IconButton from './IconButton';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          width: '200px',
          height: '200px',
          background: 'lightgray',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.5 24" fill="currentColor">
    <g id="Lag_2" data-name="Lag 2">
      <g id="Layer_1" data-name="Layer 1">
        <path
          className="cls-1"
          d="M25.33,6.16l-6.95-6A.6.6,0,0,0,18,0a.56.56,0,0,0-.58.55V3.27C14.32,3.5,0,5.55,0,23.45A.56.56,0,0,0,.58,24a.56.56,0,0,0,.58-.55c0-5.63,2.87-9.63,8.58-11.89a25.36,25.36,0,0,1,7.65-1.69v2.68a.56.56,0,0,0,.58.54.6.6,0,0,0,.41-.16l7-6a.54.54,0,0,0,.17-.38.56.56,0,0,0-.17-.39m-6.78,5.15v-2A.56.56,0,0,0,18,8.73h-.58c-2.37.12-10.79,1-15.09,7,3.38-10,12.56-11.2,15.09-11.36H18a.56.56,0,0,0,.58-.54v-2l5.51,4.77Z"
        />
      </g>
    </g>
  </svg>
);

const Template: Story<React.ComponentProps<typeof IconButton>> = args => <IconButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  variant: 'default',
  children: icon,
};

export const DefaultActive = Template.bind({});

DefaultActive.args = {
  variant: 'default',
  active: true,
  children: icon,
};

export const Clear = Template.bind({});

Clear.args = {
  variant: 'clear',
  children: icon,
};

export const Rounded = Template.bind({});

Rounded.args = {
  variant: 'rounded',
  children: icon,
};

export const ClearSmall = Template.bind({});

ClearSmall.args = {
  variant: 'clearSmall',
  children: icon,
};
