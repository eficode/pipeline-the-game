import React from 'react';
import { Meta, Story } from '@storybook/react';

import Card from './Card';
import { CardTags, CardTypes } from '@pipeline/common';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.keys(CardTypes).map(k => CardTypes[k as keyof typeof CardTypes]),
      },
    },
    tags: {
      control: {
        type: 'multi-select',
        options: Object.keys(CardTags).map(k => CardTags[k as keyof typeof CardTags]),
      },
    },
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof Card>> = args => <Card {...args} />;

export const PipelineStep = Template.bind({});

PipelineStep.args = {
  type: CardTypes.PipelineStep,
  tags: [CardTags.DeliveryStep, CardTags.ManualStep],
  title: 'A Developer Commits Code',
  subtitle: 'delivery-step',
  content:
    'A developer shares their code\nby pushing a commit to a\nversion control server, such\nas Git.\nIf you include steps before\nthis, they do not count\ntowards your deployment\nlead time.',
  number: 13,
  deckId: '7p5qqvE8kCV9WWysVc2n',
};

export const Dragged = Template.bind({});

Dragged.args = {
  ...PipelineStep.args,
  dragging: true,
};

export const Bigger = Template.bind({});

Bigger.args = {
  ...PipelineStep.args,
  bigger: true,
};
