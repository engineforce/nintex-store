import React from 'react'
import { Link } from 'gatsby'
import { Root, NavItem } from './styled'

const Navigation = () => (
  <Root>
    <NavItem>
      <Link to="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link to="/products">Products</Link>
    </NavItem>
    <NavItem>
      <Link to="/cart">Cart</Link>
    </NavItem>
  </Root>
)

export default Navigation
