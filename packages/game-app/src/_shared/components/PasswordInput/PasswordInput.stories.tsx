import React from 'react';
import { Story, Meta } from '@storybook/react';

import PasswordInput from './PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof PasswordInput>> = args => <PasswordInput {...args} />;

export const Inactive = Template.bind({});

Inactive.args = {
  label: 'Password',
};

const ActiveTemplate: Story<React.ComponentProps<typeof PasswordInput>> = args => {
  return <PasswordInput ref={ref => ref?.focus()} {...args} />;
};

export const Active = ActiveTemplate.bind({});

Active.args = {
  label: 'Password',
};
