import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { UserPage } from '../../pages/UserPage/UserPage'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  title: 'Pages/UserPage',
  component: UserPage,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=455-364&mode=design&t=d7uoOdUboyqrRO08-0'
    },
    reactRouter: reactRouterParameters({
      routing: { path: '/user' }
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
} satisfies Meta<typeof UserPage>

export default meta

type Story = StoryObj<typeof UserPage>

export const Default: Story = {
  render: () => <UserPage />
}

function getMocks() {
  return [
    {
      matcher: {
        name: 'getAllAnnotaions',
        url: 'https://szczpanczyk.tech/api/user/allannotations'
      },
      response: {
        status: 200,
        body: [
          {
            articleUrl:
              'https://www.nytimes.com/2024/02/17/world/europe/ukraine-avdiivka-withdraw-despair.html',
            annotations: [
              {
                id: 2,
                userEmail: 'angelika@gmail.com',
                articleUrl:
                  'https://www.nytimes.com/2024/02/17/world/europe/ukraine-avdiivka-withdraw-despair.html',
                title: 'Title',
                selectedText:
                  'erational situation around Avdiivka, in order to avoid encirclement and preserve the lives and health of servicemen, I decided to withdraw our units from the city and move to defense on more favorable lines,” Gen. Oleksandr Syrsky, Ukraine’s top military',
                paragraphs: [1],
                substringPosition: {
                  end: 270,
                  start: 16
                },
                color: 'blue',
                note: '',
                createdAt: '2024-02-17T14:01:15.000Z',
                updatedAt: '2024-02-17T14:01:15.000Z'
              }
            ],
            articleTitle: 'Avdiivka, Longtime Ukraine Stronghold Ukraine, Falls to Russia'
          }
        ]
      }
    },
    {
      matcher: {
        name: 'getAllBookmarks',
        url: 'https://szczpanczyk.tech/api/user/bookmarks'
      },
      response: {
        status: 200,
        body: [
          {
            userEmail: 'szczepanczykangelika@gmail.com',
            articleUrl:
              'https://www.nytimes.com/2024/02/17/world/europe/ukraine-avdiivka-withdraw-despair.html',
            articleTitle: 'Avdiivka, Longtime Ukraine Stronghold Ukraine, Falls to Russia',
            articleSummary:
              'With Ukraine’s forces at risk of encirclement, the top military commander ordered a retreat. In startlingly candid accounts, soldiers described disarray and despair.',
            imageURL:
              'https://static01.nyt.com/images/2024/02/17/multimedia/17UKRAINE-AVDIIVKA-soldier1-cqtf/17UKRAINE-AVDIIVKA-soldier1-cqtf-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=600'
          },
          {
            userEmail: 'szczepanczykangelika@gmail.com',
            articleUrl:
              'https://www.nytimes.com/2024/02/17/world/europe/ukraine-avdiivka-withdraw-despair.html',
            articleTitle: 'Article Title',
            articleSummary: 'Article summary',
            imageURL: ''
          }
        ]
      }
    }
  ]
}