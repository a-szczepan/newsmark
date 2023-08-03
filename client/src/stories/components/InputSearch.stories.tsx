import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { SearchInput } from '../../components/Input/Input';
import { getEnumEntries } from '../utils';

const meta = {
  title: 'Components/Input',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=66-175&mode=design&t=Dbe78or8ODBQzSvl-0'
    }
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const SearchInputDefault: Story = {
  args: {
    placeholder: 'Search...'
  },
  render: (args) => <SearchInput {...args}>input</SearchInput>
};
