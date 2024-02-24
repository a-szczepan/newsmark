import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { paddingDecorator } from '../decorators'
import { Accordion } from '../../components/Accordion/Accordion'
import { ReadAnnotation } from '../../components/Annotation/Annotation'
import { faker } from '@faker-js/faker'
import store from '../../store/store'
import { Provider } from 'react-redux'
import { withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'fullscreen',
    fetchMock: {}
  },
  decorators: [
    paddingDecorator,
    withRouter,
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    }
  ]
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    id: 'sb-accordion',
    header: faker.lorem.sentence(),
    boldHeader: false,
  },
  render: (args) => (
    <div style={{width: '500px'}}>
    <Accordion {...args} >
      <ReadAnnotation
        annotationId={3}
        data={{
          titleValue: faker.lorem.sentence(),
          colorValue: 'pink',
          noteValue: faker.lorem.paragraph()
        }}
        highlighted={{
          text: faker.lorem.sentence(),
          paragraphs: [1],
          substringPosition: { start: 10, end: 20 }
        }}
        setEditMode={false}
        handleAnnotationDeleteComplete={() => {}}
      />
    </Accordion>
    </div>
  )
}
