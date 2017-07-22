import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as _NavLink } from 'react-router-dom'
import { Flex, Box } from 'grid-styled'
import { format } from 'd3-format'

import { colorByValue } from '../utils'
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
  {props.stocks
    .sort((a,b) => a.code.localeCompare(b.code))
    .map(stock => (
    <List.Item key={stock.code}>
      <Link is={_NavLink} to={`/${stock.code}`}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" wrap mb={5}>
            <Box>{stock.code}</Box>
            <Box>
              <span style={{color: colorByValue(stock.holding.total.plPct)}}>
                {format('.2%')(stock.holding.total.plPct)}
              </span>
            </Box>
          </Flex>

          <Flex align="center" justify="space-between" wrap>
            <Box>{format(',.2f')(stock.currentPrice)}</Box>
            <Box>
              <span style={{color: colorByValue(stock.holding.total.pl)}}>
                {format(',.2f')(stock.holding.total.pl)}
              </span>
            </Box>
          </Flex>
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
