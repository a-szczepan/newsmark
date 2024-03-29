import type { Preview } from '@storybook/react';
import '../src/styles/global.css';
import '../src/styles/_global.scss';
import '../src/styles/variables.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
