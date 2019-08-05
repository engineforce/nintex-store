import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'
import HomePage from './index'
import { useStaticQuery } from 'gatsby'
import wait from 'waait'
import { GET_ORDER_ITEMS } from '../../components/navigation'

describe('HomePage', () => {
  describe('when render no item in cart', () => {
    const { create, mocks } = getTestContext({
      useStaticQuery,
    })

    beforeAll(async () => {
      mocks.useStaticQuery.mockImplementation(() => ({
        ...getSiteData(),
      }))

      create(<HomePage />)
      await wait(0)
    })

    it('renders all navigation items with correct links', () => {
      /** @type {renderer.ReactTestRenderer} */
      const home = create.mock.results[0].value

      expect(home.root.findByType('nav').findAllByType('a').length).toBe(3)
      expect(
        home.root
          .findByType('nav')
          .findAllByType('a')
          .map(s => s.props.href)
      ).toEqual(['/', '/products', '/cart'])
    })

    it('renders all navigation items with correct text', () => {
      /** @type {renderer.ReactTestRenderer} */
      const home = create.mock.results[0].value

      expect(
        home.root
          .findByType('nav')
          .findAllByType('a')
          .map(s =>
            s.props.children instanceof Array
              ? s.props.children.join('')
              : s.props.children
          )
      ).toEqual(['Home', 'Products', 'Cart (0)'])
    })
  })

  describe('when render 1 item in cart', () => {
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
      }))

      create(<HomePage />)
      await wait(0)
    })

    it('renders cart navigation item with correct text', () => {
      /** @type {renderer.ReactTestRenderer} */
      const homePage = create.mock.results[0].value

      expect(
        homePage.root
          .findByType('nav')
          .findByProps({ href: '/cart' })
          .props.children.join('')
      ).toEqual('Cart (1)')
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
