import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import Login from '../../pages/Login/Login';
import { Provider } from 'react-redux';
import store from '../../store/store';

const meta = {
  title: 'Pages/LoginPage',
  component: Login,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=228-3&mode=design&t=fK2CNfHDQwCCxnmz-0'
    }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
    paddingDecorator
  ]
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  render: () => <Login />
};
