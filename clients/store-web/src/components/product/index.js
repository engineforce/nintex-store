import React, { useState } from 'react'
import ProductImage from '../product-image'
import { Root, ImageWrapper, Info, Hr, Input, QuantityWrapper } from './styled'
import Spacer from '../spacer'
import { AddToCart } from './addToCart'
import { formatCurrency } from '../../libs/formatCurrency'

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1)

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
          <Input
            value={quantity}
            onChange={event => {
              const newQuantity = parseInt(event.target.value)

              if (!isNaN(newQuantity)) {
                setQuantity(newQuantity)
              }
            }}
          ></Input>
        </QuantityWrapper>
        <AddToCart productId={productId} quantity={quantity} />
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
