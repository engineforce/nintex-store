import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import ProductImage from '../product-image'
import { Root } from './styled'
import Spacer from '../spacer'
const formatCurrency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
}).format

const Product = ({ product }) => {
  return (
    <div>
      {JSON.stringify(product, undefined, 2)}
      <Link to="/products">All products</Link>
    </div>
  )
}

export default Product
