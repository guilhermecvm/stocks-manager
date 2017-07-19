import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as _NavLink } from 'react-router-dom'
import { Flex, Box } from 'grid-styled'

import List from './layout/List'
import NavLink from '../components/layout/NavLink'

const Link = (props) => (
  <NavLink
    activeStyle={{ backgroundColor: 'rgba(0, 0, 0, .5)' }}
    {...props}
    style={{width:'100%',padding:10}}
  />
)

const Menu = (props) => (
  <List style={{height:'100%'}}>
  {props.stocks.map(stock => (
    <List.Item key={stock.code}>
      <Link is={_NavLink} to={`/${stock.code}`}>
        <Flex align="center" justify="space-between">
          <Box>
            {stock.code}
          </Box>
          <Box>{stock.currentPrice}</Box>
        </Flex>
      </Link>
    </List.Item>
  ))}
  </List>
)

Menu.propTypes = {
  stocks: PropTypes.array
}

Menu.defaultProps = {
  stocks: []
}

export default Menu
