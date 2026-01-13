// Type augmentation for environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    // GraphQL API endpoint
    NEXT_PUBLIC_GRAPHQL_URL: string;

    // Node environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
