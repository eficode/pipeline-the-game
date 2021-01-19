import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import GlassOverlay from './GlassOverlay';

export default {
  title: 'Components/GlassOverlay',
  component: GlassOverlay,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof GlassOverlay>> = args => <GlassOverlay {...args} />;

export const Open = Template.bind({});

Open.args = {
  open: true,
};

const ToggleTemplate: Story<React.ComponentProps<typeof GlassOverlay>> = args => {
  const [state, setState] = useState(false);

  return (
    <div>
      <button onClick={() => setState(s => !s)}>open</button>
      <GlassOverlay open={state} />
    </div>
  );
};

export const Toggle = ToggleTemplate.bind({});

Toggle.args = {};

export const WithContent = Template.bind({});

WithContent.args = {
  children: <div style={{ background: 'white' }}>content</div>,
  open: true,
};
