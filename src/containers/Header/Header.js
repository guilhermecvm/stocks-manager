import React from 'react'
import { Flex, Box } from 'grid-styled'

import logo from '../../logo.png'
import spreadsheet from '../../spreadsheet'

class Header extends React.Component {
  signIn() {
    spreadsheet.signIn()
  }

  signOut() {
    spreadsheet.signOut()
  }

  render() {
    return (
      <Flex p={5} align="center">
        <Box>
          <img src={logo} style={{width: 32}} alt="Stocks Manager" />
        </Box>
        <Box ml={5}>
          Stocks Manager
        </Box>
        <Box ml={5}>
          <button id="authorize-button" onClick={this.signIn}>Authorize</button>
          <button id="signout-button" onClick={this.signIn}>Sign Out</button>
        </Box>
      </Flex>
    )
  }
}


export default Header
