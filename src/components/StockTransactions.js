import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'

import { Table } from './layout'

const columns = [
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date'
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'shares',
    render: (text) => (
      <span style={{color: 'rgba(255, 255, 255, .25)'}}>{text > 0 ? 'buy' : 'sell'}</span>
    )
  },
  {
    title: 'Shares',
    key: 'shares',
    dataIndex: 'shares',
    align: 'right',
    render: (text) => format(',.2f')(text)
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
    align: 'right',
    render: (text) => format(',.2f')(text)
  }
]

const StockTransactions = (props) => (
  <Table columns={columns} dataSource={props.transactions} />
)

StockTransactions.propTypes = {
  transactions: PropTypes.array
}

StockTransactions.defaultProps = {
  transactions: []
}

export default StockTransactions
