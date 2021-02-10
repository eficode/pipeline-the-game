import React from 'react';
import { Meta, Story } from '@storybook/react';

import Card from './Card';
import { CardTag, CardType } from '@pipeline/common';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.keys(CardType).map(k => CardType[k as keyof typeof CardType]),
      },
    },
    tags: {
      control: {
        type: 'multi-select',
        options: Object.keys(CardTag).map(k => CardTag[k as keyof typeof CardTag]),
      },
    },
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof Card>> = args => <Card {...args} />;

export const PipelineStep = Template.bind({});

PipelineStep.args = {
  type: CardType.PipelineStep,
  tags: [CardTag.DeliveryStep, CardTag.ManualStep],
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
