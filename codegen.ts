import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5001/graphql',
  documents: ['src/**/*.graphql.ts', '!src/gql/**'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
};

export default config;
