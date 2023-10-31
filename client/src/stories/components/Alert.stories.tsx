import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Alert, Color } from '../../components/Alert/Alert';
import { getEnumEntries } from '../utils';
import { Typography } from '../../components/Typography/Typography';
import { faker } from '@faker-js/faker';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    background: {
      control: {
        type: 'select',
        labels: getEnumEntries(Color)
      }
    }
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    background: Color.red,
    onClose: () => console.log('close')
  },
  render: (args) => (
    <Alert {...args}>
      <Typography styleVariant="body">{faker.lorem.paragraph()}</Typography>
    </Alert>
  )
};
