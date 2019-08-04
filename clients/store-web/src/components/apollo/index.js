import React, { Component } from 'react'
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'
import fetch from 'isomorphic-fetch'
import { ApolloProvider } from 'react-apollo' // Or just react-apollo

const cache = new InMemoryCache()

const typeDefs = gql`
  extend type Query {
    orderItems: [OrderItem]!
  }
  type OrderItem {
    productId: String!
    quantity: Int!
  }
`

const client = new ApolloClient({
  cache,
  fetch,
  // Paul Debug: test only
  uri: 'https://countries.trevorblades.com/',
  typeDefs,
})

export default class extends Component {
  state = {
    client: null,
    loaded: false,
  }

  async componentDidMount() {
    await persistCache({
      cache,
      storage: window.localStorage,
      maxSize: false,
      debug: process.env.NODE_ENV !== 'production',
    })

    this.setState({
      client,
    })
  }

  render() {
    const { client } = this.state
    const { children } = this.props
    if (!client) return <div>Loading...</div>
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }
}
