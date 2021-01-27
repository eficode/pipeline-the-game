import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ReactComponent as KeyboardIcon } from '../../../assets/icons/keyboard.svg';

import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Input>> = args => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const Clear = Template.bind({});
Clear.decorators = [
  Story => (
    <div style={{ padding: '50px', background: 'lightgray' }}>
      <Story />
    </div>
  ),
];
Clear.args = {
  variant: 'clear',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  iconLeft: <KeyboardIcon />,
};
