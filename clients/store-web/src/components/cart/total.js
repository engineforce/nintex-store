import React from 'react'
import { calculateOrderPrice } from 'price-calculators'
import { formatCurrency } from '../../libs/formatCurrency'

export const Total = ({ orderItems, products, promoCode }) => {
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
