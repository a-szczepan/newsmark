import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import Login from '../../pages/Login/Login';
import { Provider } from 'react-redux';
import store from '../../store/store';
import {
  reactRouterParameters,
  withRouter
} from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Pages/LoginPage',
  component: Login,
  parameters: {
    layout: 'fullscreen',
    fetchMock: {},
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=228-3&mode=design&t=fK2CNfHDQwCCxnmz-0'
    },
    reactRouter: reactRouterParameters({
      routing: { path: '/login' }
    })
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
    // paddingDecorator,
    withRouter
  ]
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  render: () => <Login />
};
