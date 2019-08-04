import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import ProductImage from '../product-image'
import { Root, Product, ProductWrapper } from './styled'
import Spacer from '../spacer'
const formatCurrency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
}).format

const Products = () => {
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

  const products = edges.map(edge => edge.node)

  return (
    <Root>
      {products.map(({ productId, name, price }) => (
        <ProductWrapper>
          <Link to={`/products/${productId}`}>
            <Product>
              <ProductImage key={productId} productId={productId} />
              <Spacer />
              <div>{name}</div>
              <div>{formatCurrency(price)}</div>
            </Product>
          </Link>
        </ProductWrapper>
      ))}
    </Root>
  )
}

export default Products
