import React from 'react'
import { EmptyButton } from './styled'
import { values, pipe, map } from 'ramda'

export const EmptyCart = ({ client, orderItems, products }) => {
  if (orderItems.length === 0) {
    // Initialize the cart to simplify user testing
    setTimeout(() => {
      client.writeData({
        data: {
          orderItems: emptyOrderItems({ orderItems, products }),
        },
      })
    })
  }

  return (
    <div>
      <EmptyButton
        onClick={() => {
          client.writeData({
            data: {
              orderItems: emptyOrderItems({ orderItems, products }),
            },
          })
        }}
      >
        EMPTY CART
      </EmptyButton>
    </div>
  )
}

function emptyOrderItems({ orderItems, products }) {
  return pipe(
    values,
    map(product => ({
      productId: product.productId,
      quantity: 0,
      __typename: 'OrderItem',
    }))
  )(products)
}
