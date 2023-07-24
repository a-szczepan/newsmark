import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TextVariant,
  TextVariantMap,
  Typography
} from '../../components/Typography/Typography';
import { marginDecorator } from '../decorators';
import { faker } from '@faker-js/faker';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [marginDecorator]
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typo: Story = {
  args: {
    variant: 'h1'
  },
  render: (args) => <Typography {...args}>{faker.lorem.lines(1)}</Typography>
};

export const TypographyVariants: Story = {
  render: () => {
    return (
      <>
        {Object.keys(TextVariantMap).map((variant) => (
          <div key={variant} style={{ display: 'flex', gap: '1rem' }}>
            <Typography variant={variant as TextVariant}>{variant}</Typography>
            <Typography variant={variant as TextVariant}>
              {faker.lorem.lines(1)}
            </Typography>
          </div>
        ))}
      </>
    );
  }
};

export const Article: Story = {
  render: () => (
    <>
      <Typography variant="h1">{faker.lorem.lines(1)}</Typography>
      <Typography variant="body">
        {faker.lorem.paragraphs({ min: 1, max: 3 })}
      </Typography>
    </>
  )
};
