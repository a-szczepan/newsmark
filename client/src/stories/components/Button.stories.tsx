import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { ButtonType, Button, IconButton } from '../../components/Button/Button';
import { getEnumEntries } from '../utils';
import { IconType } from '../../components/Icon/Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
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
    },
    variant: {
      control: {
        type: 'radio',
        labels: getEnumEntries(ButtonType)
      }
    }
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof Button | typeof IconButton>;

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const ButtonDefault: ButtonStory = {
  args: {
    variant: ButtonType.solid,
    buttonAction: () => {}
  },
  render: (args) => <Button {...args}>Button</Button>
};

const gridStyle = {
  padding: '1rem 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 120px)',
  gap: '2rem',
  marginBottom: '1rem'
};

const states = ['default', 'hover', 'active', 'focus', 'disabled'];

const generateStateId = (state: string, variants: string[]) => {
  return variants.map((i) => `#${state}-` + i);
};

const allVariantsToRender = getEnumEntries(ButtonType).concat([
  'iconButton',
  'iconButtonLight'
]);

export const AllVariants: ButtonStory = {
  parameters: {
    pseudo: {
      hover: generateStateId('hover', allVariantsToRender),
      focus: generateStateId('focus', allVariantsToRender),
      active: generateStateId('active', allVariantsToRender),
      disabled: generateStateId('disabled', allVariantsToRender)
    }
  },
  render: () => (
    <>
      <div style={gridStyle}>
        {['variant', ...states].map((t) => (
          <span>{t}</span>
        ))}
      </div>
      {getEnumEntries(ButtonType).map((variant) => (
        <div
          style={{
            ...gridStyle,
            backgroundColor: `${
              variant === 'lightLink' ? 'var(--color-dark4)' : null
            }`,
            color: `${
              variant === 'lightLink' ? 'var(--color-light1)' : 'inherit'
            }`
          }}
        >
          <span>{variant}</span>
          {states.map((state, i) => (
            <Button
              id={`${state}-${variant}`}
              variant={ButtonType[variant]}
              {...(i === states.length - 1 && { disabled: true })}
              buttonAction={
                variant === 'link' || variant == 'lightLink' ? '/' : () => {}
              }
              {...(i === states.length - 1 && { disabled: true })}
            >
              Button
            </Button>
          ))}
        </div>
      ))}
      <div style={gridStyle}>
        <span>iconButton</span>
        {states.map((state, i) => (
          <IconButton
            id={`${state}-iconButton`}
            icon={IconType.bookmark}
            buttonAction={() => {}}
            {...(i === states.length - 1 && { disabled: true })}
          />
        ))}
      </div>
      <div
        style={{
          ...gridStyle,
          backgroundColor: 'var(--color-dark4)'
        }}
      >
        <span style={{ color: 'var(--color-light1)' }}>iconButtonLight</span>
        {states.map((state, i) => (
          <IconButton
            id={`${state}-iconButtonLight`}
            icon={IconType.bookmark}
            lightVariant={true}
            buttonAction={() => {}}
            {...(i === states.length - 1 && { disabled: true })}
          />
        ))}
      </div>
    </>
  )
};
