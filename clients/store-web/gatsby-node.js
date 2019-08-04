const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const productTemplate = path.resolve('src/templates/product.js')

  const result = await graphql(`
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
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const products = result.data.allContentfulProduct.edges.map(e => e.node)

  products.forEach(product => {
    createPage({
      path: `/products/${product.productId}/`,
      component: productTemplate,
      context: product,
    })
  })
}
