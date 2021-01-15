import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = args => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: 'primary',
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  label: 'Button',
};
