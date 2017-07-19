import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'

import { Table } from './layout'
import { colorByValue } from '../utils'

const columns = [
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    render: (text) => (
      <span style={{color: 'rgba(255, 255, 255, .25)'}}>{text}</span>
    )
  },
  {
    title: 'Buy',
    key: 'buy',
    dataIndex: 'buy',
    align: 'right',
    render: (text) => format(',.2f')(text)
  },
  {
    title: 'P/L',
    key: 'pl',
    dataIndex: 'pl',
    align: 'right',
    render: (text) => (
      <span style={{color: colorByValue(text)}}>{format(',.2f')(text)}</span>
    )
  },
  {
    title: 'P/L %',
    key: 'plPct',
    dataIndex: 'plPct',
    align: 'right',
    render: (text) => (
      <span style={{color: colorByValue(text)}}>{format('.2%')(text)}</span>
    )
  }
]

const buildDataSource = (holding) => [
  {type: 'Total', ...holding.total},
  {type: 'Unrealized', ...holding.unrealized},
  {type: 'Realized', ...holding.realized}
]

const StockHolding = (props) => (
  <Table columns={columns} dataSource={buildDataSource(props.holding)} />
)

StockHolding.propTypes = {
  holding: PropTypes.object
}

StockHolding.defaultProps = {
  holding: {}
}

export default StockHolding
