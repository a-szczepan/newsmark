import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Icon, IconType, IconSize } from '../../components/Icon/Icon';
import { getEnumEntries } from '../utils';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=74-12&mode=design&t=NokjCowPSigtFsTc-0",
    },
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: IconType.eye,
    size: IconSize.small
  },
  render: (args) => <Icon {...args}/>
};

export const AllIcons: Story = {
    render: (args) => {
      return (
        <>
        <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "20px"}} >
          {getEnumEntries(IconType).map((variant) => (
            <Icon key={variant} icon={IconType[variant] as IconType} size={IconSize.medium} />
          ))}
        </div>
        </>
      );
    }
  };