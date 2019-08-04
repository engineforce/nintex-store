import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Root } from './styled'

const Home = () => (
  <Root>
    <h2>Welcome to Nintex Online Store.</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat
      velit scelerisque in dictum. Vivamus at augue eget arcu dictum varius duis
      at consectetur. Malesuada pellentesque elit eget gravida cum. Pellentesque
      nec nam aliquam sem et tortor consequat id porta. Quam quisque id diam vel
      quam elementum pulvinar etiam. Massa massa ultricies mi quis hendrerit
      dolor. Quis hendrerit dolor magna eget est. Nec dui nunc mattis enim ut
      tellus elementum sagittis. At erat pellentesque adipiscing commodo.
      Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis. Elit
      eget gravida cum sociis. Phasellus egestas tellus rutrum tellus
      pellentesque eu. Nisl condimentum id venenatis a condimentum vitae sapien
      pellentesque habitant. At risus viverra adipiscing at in tellus integer.
    </p>
    <p>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Vitae
      tortor condimentum lacinia quis. Aliquam ultrices sagittis orci a
      scelerisque purus. Velit ut tortor pretium viverra suspendisse potenti
      nullam ac. Est sit amet facilisis magna. Consectetur purus ut faucibus
      pulvinar elementum integer enim. Sed augue lacus viverra vitae congue eu
      consequat. Aliquam sem et tortor consequat id porta nibh venenatis cras.
      Congue nisi vitae suscipit tellus mauris a diam maecenas. Suspendisse
      interdum consectetur libero id faucibus nisl tincidunt eget nullam. Eget
      sit amet tellus cras adipiscing enim. Porta non pulvinar neque laoreet
      suspendisse. Ac tincidunt vitae semper quis lectus nulla at. Nisl pretium
      fusce id velit ut tortor pretium viverra suspendisse.
    </p>
  </Root>
)

Home.propTypes = {
  siteTitle: PropTypes.string,
}

Home.defaultProps = {
  siteTitle: ``,
}

export default Home
