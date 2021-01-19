import React from 'react';
import { Meta, Story } from '@storybook/react';

import Dialog from './Dialog';
import useDialog from './useDialog';
import Button from '../Button';
import Box from '../Box';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Dialog>> = args => <Dialog {...args} />;

export const Default = Template.bind({});

Default.args = {
  open: true,
  title: 'Trigger reivew',
};

const ToggleTemplate: Story<React.ComponentProps<typeof Dialog>> = ({ title }) => {
  const dialog = useDialog();

  return (
    <div>
      <Button onClick={dialog.open} label="Open" />
      <Dialog open={dialog.isOpen} title={title}>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button label="Close" onClick={dialog.close} />
        </Box>
      </Dialog>
    </div>
  );
};

export const Toggle = ToggleTemplate.bind({});

Toggle.args = {
  title: 'Share the game',
};
