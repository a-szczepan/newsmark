import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Home from '../../pages/Home/Home'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const URL = 'https://szczpanczyk.tech'
// const URL = 'http://localhost:5000'

const meta = {
  title: 'Pages/Home Page',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=4-3&mode=design&t=qP4MuO9X1UDJR3ZD-0'
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: `/`
      }
    }),
    fetchMock: {
      mocks: getMocks()
    }
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    },
    withRouter
  ]
} satisfies Meta<typeof Home>

export default meta

type Story = StoryObj<typeof Home>

export const Default: Story = {
  render: () => <Home />
}

function getMocks() {
  return [
    {
      matcher: {
        name: 'getUser',
        url: `${URL}/api/me`
      },
      response: {
        status: 200,
        body: { id: 0, email: 'test@test.com' }
      }
    }
  ]
}
