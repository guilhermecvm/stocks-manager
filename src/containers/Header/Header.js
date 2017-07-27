import React from 'react'
import { Flex, Box } from 'grid-styled'

import logo from '../../logo.png'
import spreadsheet from '../../spreadsheet'
import { Button } from '../../components/layout'

class Header extends React.Component {
  signIn() {
    spreadsheet.signIn()
  }

  signOut() {
    spreadsheet.signOut()
  }

  render() {
    return (
      <Flex p={5} align="center" style={styles.header}>
        <Box>
          <img src={logo} style={{width: 32}} alt="Stocks Manager" />
        </Box>
        <Box ml={5}>
          Stocks Manager
        </Box>
        <Box ml={5}>
          {this.props.signedIn
            ? (<Button onClick={this.signOut}>Sign Out</Button>)
            : (<Button onClick={this.signIn}>Authorize</Button>)
          }
        </Box>
      </Flex>
    )
  }
}

const styles = {
  header: {
    backgroundColor: 'rgba(0,0,0, 0.4)'
  }
}


export default Header
