import type { CodegenConfig } from '@graphql-codegen/cli';

const scalars = {
  UUID: 'string',
  JSON: 'any',
  Datetime: 'string',
  Date: 'string',
  BigFloat: 'string',
  BigInt: 'string',
  Cursor: 'string',
};

const config: CodegenConfig = {
  schema: 'http://localhost:5001/graphql',
  documents: ['src/**/*.graphql.ts', '!src/gql/**'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      config: { scalars, enumType: 'const' },
    },
    './src/gql/schema-types.ts': {
      plugins: ['typescript'],
      config: { scalars, enumType: 'const' },
    },
  },
};

export default config;
