import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ProductImage from '../product-image'
import {
  Root,
  Grid,
  Row,
  HeaderRow,
  Column,
  DescriptionColumn,
  PriceColumn,
  QuantityColumn,
  Product,
  ProductImageWrapper,
  Input,
} from './styled'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { pipe, reduce, map, prop, propEq, findIndex } from 'ramda'
import { Total } from './total'
import { formatCurrency } from '../../libs/formatCurrency'
import { EmptyCart } from './emptyCart'

const GET_ORDER_ITEMS = gql`
  {
    orderItems @client {
      productId
      quantity
    }
  }
`

const Cart = () => {
  const {
    allContentfulProduct: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allContentfulProduct(filter: { node_locale: { eq: "en-US" } }) {
          edges {
            node {
              productId
              price
              name
            }
          }
        }
      }
    `
  )

  const products = getProductsMap(edges)

  const [promoCode, setPromoCode] = useState('')

  return (
    <Root>
      <Query query={GET_ORDER_ITEMS}>
        {({ data, loading, error = undefined, client }) => {
          if (loading) return <p>Loading...</p>

          const orderItems = !error && data.orderItems ? data.orderItems : []

          return (
            <>
              {/*Added to simplify user testing*/}
              <EmptyCart
                client={client}
                products={products}
                orderItems={orderItems}
              />
              <Grid>
                <HeaderRow>
                  <DescriptionColumn>My Cart</DescriptionColumn>
                  <PriceColumn>Price</PriceColumn>
                  <QuantityColumn>Qty</QuantityColumn>
                </HeaderRow>
                <hr />
                {orderItems.map(({ productId, quantity }) => {
                  const { name, price } = products[productId]
                  return (
                    <Row key={productId}>
                      <DescriptionColumn>
                        <Product>
                          <ProductImageWrapper>
                            <ProductImage
                              key={productId}
                              productId={productId}
                            />
                          </ProductImageWrapper>
                          {name}
                        </Product>
                      </DescriptionColumn>
                      <PriceColumn>{formatCurrency(price)}</PriceColumn>
                      <QuantityColumn>
                        <Input
                          value={quantity}
                          onChange={event => {
                            const newQuantity = parseInt(
                              event.target.value || '0'
                            )

                            if (!isNaN(newQuantity)) {
                              client.writeData({
                                data: {
                                  orderItems: updateOrderItemQuantity({
                                    orderItems,
                                    productId,
                                    quantity: newQuantity,
                                  }),
                                },
                              })
                            }
                          }}
                        ></Input>
                      </QuantityColumn>
                    </Row>
                  )
                })}

                <hr />
                <Row>
                  <Column>
                    <span>Promo Code</span>
                    <Input
                      value={promoCode}
                      onChange={event => setPromoCode(event.target.value)}
                    />
                  </Column>
                  <Column>
                    <Total
                      orderItems={orderItems}
                      products={products}
                      promoCode={promoCode}
                    />
                  </Column>
                </Row>
              </Grid>
            </>
          )
        }}
      </Query>
    </Root>
  )
}

function updateOrderItemQuantity({ orderItems, productId, quantity }) {
  const foundIndex = findIndex(propEq('productId', productId))(orderItems)

  return Object.assign([...orderItems], {
    [foundIndex]: {
      ...orderItems[foundIndex],
      quantity: quantity,
    },
  })
}

const getProductsMap = pipe(
  map(prop('node')),
  reduce((obj, item) => {
    obj[item['productId']] = item
    return obj
  }, {})
)

export default Cart
