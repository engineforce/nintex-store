import React from 'react'
import renderer from 'react-test-renderer'
import Header from './index'

describe('Header', () => {
  describe('when render header with title', () => {
    const header = renderer.create(<Header siteTitle="Default Starter" />)

    it('renders a link with href to home', () => {
      expect(header.root.findByType('a').props.href).toEqual('/')
    })

    it('renders a link with body that match the title', () => {
      expect(header.root.findByType('a').props.children).toEqual(
        'Default Starter'
      )
    })
  })
})
