import React from 'react';
import { Story, Meta } from '@storybook/react';

import TextInput from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof TextInput>> = args => <TextInput {...args} />;

export const Inactive = Template.bind({});

Inactive.args = {
  label: 'Email',
};

const ActiveTemplate: Story<React.ComponentProps<typeof TextInput>> = args => {
  return <TextInput ref={ref => ref?.focus()} {...args} />;
};

export const Active = ActiveTemplate.bind({});

Active.args = {
  label: 'Email',
};
