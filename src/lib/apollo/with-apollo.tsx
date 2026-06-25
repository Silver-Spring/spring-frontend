'use client';
import { ApolloLink, HttpLink } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import React from 'react';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import Cookies from 'js-cookie';
import { TOKEN_NAME } from '@/modules/auth/hooks';
import { useUserStore } from '@/stores/use-user-store';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

// Catches UNAUTHENTICATED GraphQL errors and HTTP 401s globally.
// Clears the session and redirects to login without requiring each
// query to handle auth errors individually.
const errorLink = new ErrorLink(({ error }) => {
  const isUnauthenticated =
    (CombinedGraphQLErrors.is(error) &&
      error.errors.some((e) => e.extensions?.code === 'UNAUTHENTICATED')) ||
    ('statusCode' in error && (error as unknown as { statusCode: number }).statusCode === 401);

  if (isUnauthenticated && typeof window !== 'undefined') {
    Cookies.remove(TOKEN_NAME, { path: '/' });
    useUserStore.getState().clearUser();
    if (!window.location.pathname.startsWith('/auth')) {
      window.location.href = '/auth/login';
    }
  }
});

interface Props {
  children?: React.ReactNode;
}

const WithApollo: React.FC<Props> = ({ children }) => {
  const makeClient = () => {
    const authMiddleware = new ApolloLink((operation, forward) => {
      // Read the token directly from cookies on EVERY request
      // This ensures we always have the latest token without needing component re-renders
      const token = Cookies.get(TOKEN_NAME);

      // Add the authorization header if token exists
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (process.env.NODE_ENV !== 'production') {
        // Adds messages only in a dev environment
        loadDevMessages();
        loadErrorMessages();
      }

      return forward(operation);
    });

    return new ApolloClient({
      link: errorLink.concat(authMiddleware.concat(httpLink)),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              currentUser: {
                merge(existing, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
          nextFetchPolicy: 'cache-first',
        },
        query: {
          fetchPolicy: 'cache-first',
        },
      },
    });
  };

  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};

export default WithApollo;
