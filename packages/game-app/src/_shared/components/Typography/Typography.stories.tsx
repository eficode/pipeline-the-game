import React from 'react';
import { Story, Meta } from '@storybook/react';

import Typography from './Typography';
import Box from '../Box';
import styled from 'styled-components';

const Container = styled(Box)`
  ${Typography} {
    margin-top: 16px;
  }
`;

export default {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {},
} as Meta;

const Template: Story<React.ComponentProps<typeof Typography>> = ({ children }) => {
  return (
    <Container>
      <Typography variant="title">title: {children}</Typography>
      <Typography variant="content">content: {children}</Typography>
      <Typography variant="label">label: {children}</Typography>
    </Container>
  );
};

export const ShowCase = Template.bind({});

ShowCase.args = {
  children: 'Text content',
};
