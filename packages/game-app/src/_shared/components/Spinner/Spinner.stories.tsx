import React from 'react';
import { Story, Meta } from '@storybook/react';

import Spinner from './Spinner';
import { Clear } from '../Input/Input.stories';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Spinner>> = args => <Spinner {...args} />;

export const Default = Template.bind({});

Default.args = {};
Default.decorators = [
  Story => (
    <div style={{ padding: '50px', background: 'lightgray' }}>
      <Story />
    </div>
  ),
];
