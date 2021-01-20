import React from 'react';
import { Meta, Story } from '@storybook/react';

import Link from './Link';

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Link>> = args => <Link {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Go to page',
};
