export const getApiBaseUrl = (): string => {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';
  return graphqlUrl.replace(/\/graphql\/?$/, '');
};
