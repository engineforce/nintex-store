module.exports = {
  siteMetadata: {
    title: `Nintex Online Store`,
    description: `Online store with great promotions.`,
    author: `Paul Li`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'product-images',
        path: `${__dirname}/src/components/product-image/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        // Space: The example project
        spaceId: `ss6bwxb9u7jw`,
        accessToken: process.env.NINTEX_CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
