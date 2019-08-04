import React from 'react'
import ProductImage from '../product-image'
import {
  Root,
  ImageWrapper,
  Info,
  Hr,
  AddButton,
  Input,
  QuantityWrapper,
} from './styled'
import Spacer from '../spacer'
import { ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'
const formatCurrency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
}).format

const Product = ({ product }) => {
  const { productId, name, price, description } = product
  return (
    <Root>
      <ImageWrapper>
        <ProductImage productId={productId} />
      </ImageWrapper>
      <Spacer />
      <Info>
        <h1>{name}</h1>
        <div>{formatCurrency(price)}</div>
        <QuantityWrapper>
          <div>Quantity</div> {` `}
          <Input value={1}></Input>
        </QuantityWrapper>
        {/* Paul Debug */}
        <AddToCart productId={productId} quantity={1} />
        <Hr />
        <div>
          <h2>Product Info</h2>
          <p>{description}</p>
        </div>
      </Info>
    </Root>
  )
}

const GET_ORDER_ITEMS = gql`
  {
    orderItems @client {
      productId
      quantity
    }
  }
`

const AddToCart = ({ productId, quantity }) => (
  <div>
    <Query query={GET_ORDER_ITEMS} fetchPolicy={'cache-only'}>
      {({ data, loading, error, client }) => {
        if (loading) return <p>Loading...</p>

        const orderItems = !error && data.orderItems ? data.orderItems : []
        return (
          <AddButton
            onClick={() => {
              client.writeData({
                data: {
                  orderItems: [
                    ...orderItems,
                    {
                      productId,
                      quantity,
                      __typename: 'OrderItem',
                    },
                  ],
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

export default Product
