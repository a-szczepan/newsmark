import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Typography,
  TextVariant
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
  argTypes: {
    variant: {
      options: Object.keys(TextVariant),
      mapping: TextVariant
    }
  },
  decorators: [marginDecorator]
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typo: Story = {
  args: {
    variant: TextVariant.Caption
  },
  render: (args) => <Typography {...args}>{faker.lorem.lines(1)}</Typography>
};

export const TypographyVariants: Story = {
  render: () => {
    return (
      <>
        {Object.keys(TextVariant).map((variant) => (
          <div key={variant} style={{ display: 'flex', gap: '1rem' }}>
            <Typography variant={TextVariant[variant]}>{variant}</Typography>
            <Typography variant={TextVariant[variant]}>
              {faker.lorem.lines(1)}
            </Typography>
          </div>
        ))}
      </>
    );
  }
};
