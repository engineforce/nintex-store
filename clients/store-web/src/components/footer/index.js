import React from 'react'
import { Root } from './styled'

const Footer = () => (
  <Root>
    <span>
      Built by {` `}{' '}
      <a target="blank" href="https://www.linkedin.com/in/paul-li-97381b3/">
        engineforce
      </a>
      , © {new Date().getFullYear()}
    </span>
  </Root>
)

export default Footer
