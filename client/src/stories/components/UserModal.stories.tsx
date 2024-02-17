import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { paddingDecorator } from '../decorators'
import { UserModal } from '../../components/UserModal/UserModal'

const meta = {
  title: 'Components/UserModal',
  component: UserModal,
  parameters: {
    layout: 'fullscreen',
    fetchMock: {}
  },

  decorators: [paddingDecorator]
} satisfies Meta<typeof UserModal>

export default meta

type Story = StoryObj<typeof UserModal>

export const Default: Story = {
  render: () => <UserModal />
}
