import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { paddingDecorator } from '../decorators'
import { UserModal } from '../../components/UserModal/UserModal'
import { withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  title: 'Components/UserModal',
  component: UserModal,
  parameters: {
    layout: 'fullscreen',
    fetchMock: {},
  },
  decorators: [paddingDecorator, withRouter]
} satisfies Meta<typeof UserModal>

export default meta

type Story = StoryObj<typeof UserModal>

export const Default: Story = {
  render: () => <UserModal />
}
