import React from 'react'
import { applySpec, pipe, prop, path } from 'ramda'

// Components
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Product from '../components/product'

const ProductPage = ({ pageContext: { productId }, data }) => {
  return (
    <Layout>
      <SEO title={`Product - ${data.contentfulProduct.name}`} />
      <Product product={getProduct(data)} />
    </Layout>
  )
}

const getProduct = pipe(
  prop('contentfulProduct'),
  applySpec({
    productId: prop('productId'),
    name: prop('name'),
    price: prop('price'),
    description: path(['description', 'description']),
  })
)

export const pageQuery = graphql`
  query($productId: String) {
    contentfulProduct(productId: { eq: $productId }) {
      productId
      name
      price
      description {
        description
      }
    }
  }
`

export default ProductPage
