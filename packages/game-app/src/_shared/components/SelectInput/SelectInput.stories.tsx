import React from 'react';
import { Story, Meta } from '@storybook/react';

import SelectInput from './SelectInput';

export default {
  title: 'Components/SelectInput',
  component: SelectInput,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof SelectInput>> = args => <SelectInput {...args} />;

export const Inactive = Template.bind({});

Inactive.args = {
  label: 'Roles',
  options: [
    {
      label: 'Role A',
      value: 'role-a',
    },
    {
      label: 'Role B',
      value: 'role-b',
    },
    {
      label: 'Role C',
      value: 'role-c',
    },
  ],
};

export const WithEmptyLabel = Template.bind({});

WithEmptyLabel.args = {
  ...Inactive.args,
  emptyOption: true,
  emptyOptionLabel: 'Select a role',
};
