import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Box, Flex } from 'grid-styled'

import theme from '../../theme'
import Header from '../Header'
import Menu from '../../components/Menu'
import Stock from '../Stock'

class App extends Component {
  componentDidMount() {
    this.props.getStocks()
  }

  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Flex direction="column" style={{height:'100vh'}}>
            <Header />

            <Flex flex="1">
              <Box w={2/12}>
                <Menu stocks={this.props.stocks} />
              </Box>
              <Box w={10/12} px={10}>
                <Route exact path="/:stock" component={Stock} />
              </Box>
            </Flex>
          </Flex>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  stocks: PropTypes.array,
  getStocks: PropTypes.func.isRequired
}

App.defaultProps = {
  stocks: []
}

export default App
