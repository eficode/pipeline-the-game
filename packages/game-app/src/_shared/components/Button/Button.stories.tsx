import React from 'react';
import { Meta, Story } from '@storybook/react';

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

export const Fun = Template.bind({});

Fun.args = {
  variant: 'fun',
  label: 'Button',
};
