# nintex-store

Online store with great promotions. https://nintex-store-engineforce.netlify.com/

[![Build Status][1]][2] [![Netlify Status][3]][4]

# Get Started

```
git clone git@github.com:engineforce/nintex-store.git
cd nintex-store

npm install
npm test
npm run dev
```

Navigate to http://localhost:8000/products or https://nintex-store-engineforce.netlify.com/products (hosted on netlify)

# Design decisions

1. This is a monorepo managed by [lerna](https://github.com/lerna/lerna).
2. Using `node 8` which supports native async await and many ES6 features such as const.
3. Avoid transpilation (babel, typescript, webpack) for libraries such as `packages/price-calculator`, I know that it will not run in old browsers such as IE without transpilation, however, it can easily be set up if required.
4. `packages/price-calculators` is a shared library, ideally, it will be used in the backend; but since you won’t be judging any back-end implementation, I did not write any backend code. However, this package will easily be reused in the backend if required.
5. I have named the source files of promo strategies using their promo codes because it is hard to define good function names for them, they may cause more confusion than the promo codes, which are already been known by the domain experts. Obviously, we can discuss the pros and cons if we are working in the same office.
6. Products (name, descriptions and price) are loaded from [Contentful (headless CMS)](https://www.contentful.com/) at build time by [gatsby](https://www.gatsbyjs.org/). It requires `NINTEX_CONTENTFUL_ACCESS_TOKEN` environment variable set to run `gatsby build` and `gatsby develop`.
7. Generally, I prefer a flat folder structure, i.e., for `clients/store-web/src/components`, I did not separate `presentational` and `container` components into separate folders. Again we can discuss the pros and cons when working together.
8. Currently used [Apollo Client](https://github.com/apollographql/apollo-client) (for both server and client state) to avoid complex state management such as [Redux](https://redux.js.org/introduction/getting-started), I have put the business logic in the container components because they are simple (also due to the time constraint). We can introduce Redux when business logic becomes more complicated.
9. All steps after the `View Cart` page such as checkout, payment, shipment etc. are not implemented due to the time constraint.

## TODO:

1. Error handling: Setup [error handling properly in react](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).
2. Unit tests / Integration test: `packages/price-calculators` has 100% test coverage, however, need to write more tests for `store-web`.
3. Styling: Fix the look and feel.
4. Refactor: Move business logic out of the components

[1]: https://travis-ci.com/engineforce/nintex-store.svg?branch=master
[2]: https://travis-ci.com/engineforce/nintex-store
[3]: https://api.netlify.com/api/v1/badges/e3ce6e44-a5c2-4b83-8d5e-30ab4e9841ef/deploy-status
[4]: https://app.netlify.com/sites/nintex-store-engineforce/deploys
