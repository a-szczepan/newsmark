import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Logo } from '../../components/Logo/Logo';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'fullscreen',
    fetchMock: {}
  },
  decorators: [paddingDecorator, withRouter]
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />
};
