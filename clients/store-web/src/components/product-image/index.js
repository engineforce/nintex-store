import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const ProductImage = ({ productId }) => {
  const images = useStaticQuery(graphql`
    fragment ImageFile on File {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    query {
      form: file(
        sourceInstanceName: { eq: "product-images" }
        relativePath: { eq: "form.png" }
      ) {
        ...ImageFile
      }
      wf: file(
        sourceInstanceName: { eq: "product-images" }
        relativePath: { eq: "workflow.png" }
      ) {
        ...ImageFile
      }
      docgen: file(
        sourceInstanceName: { eq: "product-images" }
        relativePath: { eq: "docgen.jpg" }
      ) {
        ...ImageFile
      }
    }
  `)

  return <Img fluid={images[productId].childImageSharp.fluid} />
}

export default ProductImage
