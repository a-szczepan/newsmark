import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { paddingDecorator } from '../decorators';
import { Input, InputType, SearchInput } from '../../components/Input/Input';
import { getEnumEntries } from '../utils';
import { faker } from '@faker-js/faker';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/QsqqfX07v3j9m5FUppaZQd/Newsmark?type=design&node-id=66-175&mode=design&t=Dbe78or8ODBQzSvl-0'
    }
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
        labels: getEnumEntries(InputType)
      }
    }
  },
  decorators: [paddingDecorator]
} satisfies Meta<typeof Input>;

export default meta;

type InputStory = StoryObj<typeof Input>;

export const InputDefault: InputStory = {
  args: {
    type: InputType.text,
    name: 'input',
    label: 'Label'
  },
  decorators: [
    (Story) => (
      <form>
        <Story />
      </form>
    )
  ],
  render: (args) => <Input {...args}>input</Input>
};

const gridStyle = {
  padding: '1rem 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  marginBottom: '1rem'
};

const spanStyle = {
  fontSize: '1rem',
  marginBottom: '1rem'
};

const Container = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
  );
};

const getProps = (type: InputType, index) => {
  return {
    type: type,
    name: `${InputType[type]}-name`,
    label: 'Label',
    placeholder: `${InputType[type]}`
  };
};

const states = ['default', 'hover', 'active', 'focus'];

const generateStateId = (state: string, variants: string[]) => {
  return variants.map((i) => `#${state}-` + i);
};

const allVariantsToRender = getEnumEntries(InputType).concat('search');

export const AllInputVariants: InputStory = {
  parameters: {
    pseudo: {
      hover: generateStateId('hover', allVariantsToRender),
      focus: generateStateId('focus', allVariantsToRender),
      active: generateStateId('active', allVariantsToRender)
    }
  },
  render: () => (
    <>
      <form>
        {getEnumEntries(InputType)
          .concat('search')
          .map((type, i) => {
            const props = getProps(InputType[type], i);
            return (
              <div key={type}>
                <h1>{type}</h1>
                <div style={gridStyle}>
                  {states.map((state, i) => (
                    <Container key={`${type}-${state}`}>
                      <span style={spanStyle}>{state}</span>
                      {type === 'search' ? (
                        <SearchInput id={faker.string.uuid()} />
                      ) : (
                        <Input id={faker.string.uuid()} {...props} />
                      )}
                    </Container>
                  ))}
                  {type !== 'search' && (
                    <Container>
                      <span style={spanStyle}>error</span>
                      <Input
                        {...props}
                        error={true}
                        errorMessage="Error message"
                      />
                    </Container>
                  )}
                  <Container>
                    <span style={spanStyle}>disabled</span>
                    {type === 'search' ? (
                      <SearchInput  disabled={true} />
                    ) : (
                      <Input {...props} disabled={true} />
                    )}
                  </Container>
                </div>
              </div>
            );
          })}
      </form>
    </>
  )
};
