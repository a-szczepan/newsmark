import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Header } from '../../components/Header/Header';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [paddingDecorator, withRouter]
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Header {...args}></Header>
};
