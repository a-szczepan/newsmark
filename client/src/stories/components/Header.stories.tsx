import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { marginDecorator } from '../decorators';
import { Header } from '../../components/Header/Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [marginDecorator]
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Header {...args}></Header>
};