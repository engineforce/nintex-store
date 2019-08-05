import React from 'react'
import { Link } from 'gatsby'
import { Root, NavItem } from './styled'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { reduce } from 'ramda'

export const GET_ORDER_ITEMS = gql`
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
      <Query query={GET_ORDER_ITEMS}>
        {({ data, loading, error = undefined }) => {
          return (
            <Link to="/cart">
              Cart (
              {!loading && !error && data.orderItems
                ? reduce(
                    (count, item) => count + item.quantity,
                    0,
                    data.orderItems
                  )
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
