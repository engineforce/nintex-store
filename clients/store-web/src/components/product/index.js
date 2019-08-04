import React from 'react'
import ProductImage from '../product-image'
import { Root, ImageWrapper, Info, Hr, Input, QuantityWrapper } from './styled'
import Spacer from '../spacer'
import { AddToCart } from './addToCart'

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
        {/* Paul Debug: quantity is hard coded */}
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

export default Product
