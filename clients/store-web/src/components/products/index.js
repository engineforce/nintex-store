import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ProductImage from '../product-image'

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
    <ul>
      {products.map(({ productId }) => (
        <li>
          {productId}
          <ProductImage key={productId} productId={productId} />
        </li>
      ))}
    </ul>
  )
}

export default Products
