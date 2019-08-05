import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'
import CartPage from './index'
import { useStaticQuery } from 'gatsby'
import wait from 'waait'
import { GET_ORDER_ITEMS } from '../../components/navigation'
jest.mock('../../components/product-image', () => 'ProductImage')

describe('CartPage', () => {
  describe('when render with no item in cart', () => {
    const { create, mocks } = getTestContext({
      useStaticQuery,
    })

    beforeAll(async () => {
      mocks.useStaticQuery.mockImplementation(() => ({
        ...getSiteData(),
        ...getProductData(),
      }))

      create(<CartPage />)
      await wait(0)
    })

    it('', () => {
      /** @type {renderer.ReactTestRenderer} */
      const home = create.mock.results[0].value
      expect(home.toJSON()).toMatchSnapshot()
    })
  })

  describe('when render with 1 item in cart', () => {
    const { create, mocks } = getTestContext({
      useStaticQuery,
      apolloData: [
        {
          request: {
            query: GET_ORDER_ITEMS,
          },
          result: {
            data: {
              orderItems: [{ productId: 'form', quantity: 1 }],
            },
          },
        },
      ],
    })

    beforeAll(async () => {
      mocks.useStaticQuery.mockImplementation(() => ({
        ...getSiteData(),
        ...getProductData(),
      }))

      create(<CartPage />)
      await wait(0)
    })

    it('', () => {
      /** @type {renderer.ReactTestRenderer} */
      const home = create.mock.results[0].value
      expect(home.toJSON()).toMatchSnapshot()
    })
  })
})

function getTestContext({ useStaticQuery, apolloData = undefined }) {
  const mocks = {
    useStaticQuery,
    apollo: apolloData || [
      {
        request: {
          query: GET_ORDER_ITEMS,
        },
        result: {
          data: {
            orderItems: [],
          },
        },
      },
    ],
  }
  return {
    mocks,
    create: jest.fn().mockImplementation(element =>
      renderer.create(
        <MockedProvider addTypename={false} mocks={mocks.apollo}>
          {element}
        </MockedProvider>
      )
    ),
  }
}

function getSiteData() {
  return {
    site: {
      siteMetadata: {
        title: 'Online Store',
      },
    },
  }
}

function getProductData() {
  return {
    allContentfulProduct: {
      edges: [
        {
          node: {
            productId: 'wf',
            price: 199.99,
            description: {
              description: 'Workflow description',
            },
            name: 'Workflow',
          },
        },
        {
          node: {
            productId: 'form',
            price: 99.99,
            description: {
              description: 'Form description',
            },
            name: 'Form',
          },
        },
        {
          node: {
            productId: 'docgen',
            price: 9.99,
            description: {
              description: 'Document Generation description',
            },
            name: 'Document Generation',
          },
        },
      ],
    },
  }
}
