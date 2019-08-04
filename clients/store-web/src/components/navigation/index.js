import React from 'react'
import { Link } from 'gatsby'
import { Root, NavItem } from './styled'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_ORDER_ITEMS = gql`
  {
    orderItems @client {
      productId
      quantity
    }
  }
`

const Navigation = () => (
  <Root>
    <NavItem>
      <Link to="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link to="/products">Products</Link>
    </NavItem>
    <NavItem>
      <Query query={GET_ORDER_ITEMS} fetchPolicy={'cache-only'}>
        {({ data, loading, error }) => {
          return (
            <Link to="/cart">
              Cart (
              {!loading && !error && data.orderItems
                ? data.orderItems.length
                : 0}
              )
            </Link>
          )
        }}
      </Query>
    </NavItem>
  </Root>
)

export default Navigation
