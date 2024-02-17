import type { StorybookConfig } from '@storybook/react-webpack5'
const { getLocalIdentName } = require('css-loader-shorter-classnames')
const getLocalIdent = getLocalIdentName()

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    'storybook-addon-react-router-v6',
    '@storybook/addon-designs',
    'storybook-addon-pseudo-states',
    'storybook-css-modules',
    'storybook-addon-fetch-mock',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass')
        }
      }
    },
    {
      name: 'storybook-css-modules',
      options: {
        cssModulesLoaderOptions: {
          importLoaders: 1,
          modules: {
            getLocalIdent
          }
        }
      }
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
