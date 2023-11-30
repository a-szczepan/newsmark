import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Loader } from '../../components/Loader/Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof Loader>;

export const Article: Story = {
  render: () => (<Loader/>)
};
