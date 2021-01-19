import React from 'react';
import { Meta, Story } from '@storybook/react';

import ExpandableTopPanel from './ExpandableTopPanel';

export default {
  title: 'Components/ExpandableTopPanel',
  component: ExpandableTopPanel,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '300px',
          width: '500px',
          background: 'lightgray',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<React.ComponentProps<typeof ExpandableTopPanel>> = args => (
  <ExpandableTopPanel {...args}>
    <div>
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
    </div>
  </ExpandableTopPanel>
);

export const Default = Template.bind({});

Default.args = {
  label: 'Scenario',
};
