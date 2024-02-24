import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { paddingDecorator } from '../decorators'
import { ReadAnnotation, EditAnnotation } from '../../components/Annotation/Annotation'
import { faker } from '@faker-js/faker'
import store from '../../store/store'
import { Provider } from 'react-redux'
import { withRouter } from 'storybook-addon-react-router-v6'

const meta = {
  title: 'Components/Annotations',
  component: ReadAnnotation,
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
} satisfies Meta<typeof ReadAnnotation>

export default meta

type ReadAnnotationStory = StoryObj<typeof ReadAnnotation>

export const Read: ReadAnnotationStory = {
  args: {
    annotationId: 3,
    data: {
      titleValue: faker.lorem.sentence(),
      colorValue: 'pink',
      noteValue: faker.lorem.paragraph()
    },
    highlighted: {
      text: faker.lorem.sentence(),
      paragraphs: [1],
      substringPosition: { start: 10, end: 20 }
    },
    setEditMode: false,
    handleAnnotationDeleteComplete: () => {}
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ReadAnnotation {...args} />
    </div>
  )
}

type EditAnnotationStory = StoryObj<typeof EditAnnotation>
export const Edit: EditAnnotationStory = {
  args: {
    annotationId: 3,
    url: 'www.sample.url',
    formData: {
      titleValue: faker.lorem.sentence(),
      colorValue: 'pink',
      noteValue: faker.lorem.paragraph()
    },
    highlighted: {
      text: faker.lorem.sentence(),
      paragraphs: [1],
      substringPosition: { start: 10, end: 20 }
    },
    handleAnnotationEditComplete: () => {},
    cancel: () => {}
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <EditAnnotation {...args} />
    </div>
  )
}
