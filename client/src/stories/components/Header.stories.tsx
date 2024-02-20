import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Header } from '../../components/Header/Header';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import store from '../../store/store';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    fetchMock: {}
  },
  decorators: [paddingDecorator, withRouter,     (Story) => {
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  },]
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Header {...args}></Header>
};
