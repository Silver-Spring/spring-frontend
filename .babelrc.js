import { babelOptimizerPlugin } from '@graphql-codegen/client-preset';

export const presets = ['next/babel'];
export const plugins = [
  [
    babelOptimizerPlugin,
    {
      artifactDirectory: './src/gql',
      gqlTagName: 'graphql',
    },
  ],
];
