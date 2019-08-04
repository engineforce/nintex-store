import React from 'react'
import { findIndex, propEq } from 'ramda'
import { Query } from 'react-apollo'
import { AddButton } from './styled'
import gql from 'graphql-tag'

const GET_ORDER_ITEMS = gql`
  {
    orderItems @client {
      productId
      quantity
    }
  }
`

export const AddToCart = ({ productId, quantity }) => (
  <div>
    <Query query={GET_ORDER_ITEMS} fetchPolicy={'cache-only'}>
      {({ data, loading, error = undefined, client }) => {
        if (loading) return <p>Loading...</p>

        const orderItems = !error && data.orderItems ? data.orderItems : []
        return (
          <AddButton
            onClick={() => {
              client.writeData({
                data: {
                  orderItems: addOrderItem({ orderItems, productId, quantity }),
                },
              })
            }}
          >
            ADD TO CART
          </AddButton>
        )
      }}
    </Query>
  </div>
)

function addOrderItem({ orderItems, productId, quantity }) {
  const foundIndex = findIndex(propEq('productId', productId))(orderItems)

  if (foundIndex > -1) {
    return Object.assign([...orderItems], {
      [foundIndex]: {
        ...orderItems[foundIndex],
        quantity: orderItems[foundIndex].quantity + quantity,
      },
    })
  }

  return [
    ...orderItems,
    {
      productId,
      quantity,
      __typename: 'OrderItem',
    },
  ]
}
