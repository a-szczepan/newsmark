import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { IconButton } from '../../components/Button/Button';
import { getEnumEntries } from '../utils';
import { IconType } from '../../components/Icon/Icon';

const meta = {
  title: 'Components/Button',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=66-175&mode=design&t=Dbe78or8ODBQzSvl-0'
    }
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        labels: getEnumEntries(IconType)
      }
    }
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof IconButton>;

export default meta;

type IconButtonStory = StoryObj<typeof IconButton>;

export const IconButtonDefault: IconButtonStory = {
  args: {
    icon: IconType.bookmark,
    action: () => {}
  },
  render: (args) => <IconButton {...args} />
};
