import React from 'react';
import { Meta, Story } from '@storybook/react';

import PopoverDetails from './PopoverDetails';

export default {
  title: 'Components/PopoverDetails',
  component: PopoverDetails,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof PopoverDetails>> = args => <PopoverDetails {...args} />;

export const Default = Template.bind({});

Default.args = {
  details: 'This is the content of the popover detail component. Nice stuff, uh?',
};
