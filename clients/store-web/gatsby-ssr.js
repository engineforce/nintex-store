import React from 'react'
import ApolloProvider from './src/components/apollo'

export const wrapRootElement = ({ element }) => (
  <ApolloProvider>{element}</ApolloProvider>
)
