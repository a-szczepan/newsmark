import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Tags,
  TextVariant,
  TextVariantMap,
  Typography
} from '../../components/Typography/Typography';
import { marginDecorator } from '../decorators';
import { faker } from '@faker-js/faker';

//TODO: fix enum  selection

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=0-1&mode=design&t=himZfszZiqISndhd-0",
    },
  },
  decorators: [marginDecorator]
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typo: Story = {
  args: {
    styleVariant: 'h1'
  },
  render: (args) => <Typography {...args}>{faker.lorem.lines(1)}</Typography>
};

export const TypographyVariants: Story = {
  render: () => {
    return (
      <>
        {Object.keys(TextVariantMap).map((variant) => (
          <div key={variant} style={{ display: 'flex', gap: '1rem' }}>
            <Typography styleVariant={variant as TextVariant}>{variant}</Typography>
            <Typography styleVariant={variant as TextVariant}>
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
      <Typography styleVariant="h3" tag={Tags.h1}>{faker.lorem.lines(1)}</Typography>
      <Typography styleVariant="body">
        {faker.lorem.paragraphs({ min: 1, max: 3 })}
      </Typography>
    </>
  )
};
