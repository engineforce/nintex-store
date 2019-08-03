import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Root, H1 } from './styled'

const Header = ({ siteTitle }) => (
  <Root>
    <H1>
      <Link to="/">{siteTitle}</Link>
    </H1>
  </Root>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
