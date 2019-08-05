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
import { pipe, reduce, map, prop } from 'ramda'
import { calculateOrderPrice } from 'price-calculators'

const formatCurrency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
}).format

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
      <Query query={GET_ORDER_ITEMS} fetchPolicy={'cache-only'}>
        {({ data, loading, error = undefined }) => {
          if (loading) return <p>Loading...</p>

          const orderItems = !error && data.orderItems ? data.orderItems : []

          return (
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
                          <ProductImage key={productId} productId={productId} />
                        </ProductImageWrapper>
                        {name}
                      </Product>
                    </DescriptionColumn>
                    <PriceColumn>{price}</PriceColumn>
                    {/* Paul Debug: quantity cannot be changed yet */}
                    <QuantityColumn>
                      <Input value={quantity}></Input>
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
                  {renderTotal({
                    orderItems,
                    products,
                    promoCode,
                  })}
                </Column>
              </Row>
            </Grid>
          )
        }}
      </Query>
    </Root>
  )
}

function renderTotal({ orderItems, products, promoCode }) {
  const { total, discountedTotal } = calculateOrderPrice({
    orderItems,
    products,
    promoCode,
  })

  return (
    <>
      <span>Total</span>
      <div>{formatCurrency(total)}</div>

      {discountedTotal && discountedTotal !== total && (
        <>
          <span>Discounted Total</span>
          <div>{formatCurrency(discountedTotal)}</div>
        </>
      )}
    </>
  )
}

const getProductsMap = pipe(
  map(prop('node')),
  reduce((obj, item) => {
    obj[item['productId']] = item
    return obj
  }, {})
)

export default Cart
