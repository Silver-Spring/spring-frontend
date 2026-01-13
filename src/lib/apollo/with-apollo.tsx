'use client';
import { ApolloLink, HttpLink } from '@apollo/client';
import React from 'react';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import Cookies from 'js-cookie';
import { TOKEN_NAME } from '@/modules/auth/hooks';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

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
      link: authMiddleware.concat(httpLink),
      cache: new InMemoryCache({}),
    });
  };

  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};

export default WithApollo;
