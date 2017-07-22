import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import { Flex, Box } from 'grid-styled'

import { colorByValue } from '../utils'
import { Table } from '../components/layout'

const Detail = ({title, children}) => (
  <Flex column align="center">
    <Box>
      <Box style={{fontWeight: 'bold',fontSize:18}}>{children}</Box>
      <Box style={{color: 'rgba(255, 255, 255, .25)'}}>{title}</Box>
    </Box>
  </Flex>
)

const columns = [
  {
    title: 'Shares',
    key: 'shares',
    dataIndex: 'shares',
    render: (text) => <Detail title="Shares">{format(',')(text)}</Detail>
  },
  {
    title: 'Average Price',
    key: 'avgCost',
    dataIndex: 'avgCost',
    render: (text) => <Detail title="Average Price">{format(',.2f')(text)}</Detail>
  },
  {
    title: 'Current Price',
    key: 'currentPrice',
    dataIndex: 'currentPrice',
    render: (text) => <Detail title="Current Price">{format(',.2f')(text)}</Detail>
  },
  {
    title: 'Market Value',
    key: 'marketValue',
    dataIndex: 'marketValue',
    render: (text) => <Detail title="Market Value">{format(',.2f')(text)}</Detail>
  },
  {
    title: 'Unrealized P/L',
    key: 'unrealizedPLPCT',
    dataIndex: 'unrealizedPLPCT',
    render: (text) => (
      <Detail title="Unrealized P/L">
        <span style={{color: colorByValue(text)}}>{format('.2%')(text)}</span>
      </Detail>
    )
  },
]

const buildDataSource = ({
  shares,
  currentPrice,
  avgCost,
  marketValue,
  unrealizedPLPCT
}) => [
  {
    shares,
    currentPrice,
    avgCost,
    marketValue,
    unrealizedPLPCT
  }
]

const StockStats = (props) => (
    <Table columns={columns} dataSource={buildDataSource(props)} layout="fixed" bordered />
)

StockStats.propTypes = {
  avgCost: PropTypes.number,
  currentPrice: PropTypes.number,
  shares: PropTypes.number,
  marketValue: PropTypes.number,
  unrealizedPLPCT: PropTypes.number
}

StockStats.defaultProps = {
  avgCost: 0,
  currentPrice: 0,
  shares: 0,
  marketValue: 0,
  unrealizedPLPCT: 0
}

export default StockStats
