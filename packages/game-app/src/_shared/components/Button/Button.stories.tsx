import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = args => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  variant: 'default',
  label: 'Button',
};

export const IconClear = Template.bind({});

IconClear.decorators = [
  Story => (
    <div style={{ padding: '50px', background: 'grey' }}>
      <Story />
    </div>
  ),
];

IconClear.args = {
  variant: 'clear',
  label: 'Back to game',
  leftIcon: <ArrowIcon />,
};

export const Loading = Template.bind({});

Loading.args = {
  variant: 'default',
  label: 'Button',
  loading: true,
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
  label: 'Button',
  rightIcon: <ArrowIcon />,
};
