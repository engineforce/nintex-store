import React from 'react'
import { Root } from './styled'

const Footer = () => (
  <Root>
    <span>
      Built by {` `} <a href="mailto:engineforce@gmail.comm">engineforce</a>, ©{' '}
      {new Date().getFullYear()}
    </span>
  </Root>
)

export default Footer
