import React from 'react'
import PropTypes from 'prop-types'
import { genDateValue } from '@vx/mock-data'

import LineChart from './charts/LineChart'

const data1 = genDateValue(20)
const data2 = genDateValue(20)
const width = 720
const height = 360
const margin = {
  top:10,
  bottom: 40,
  left: 15,
  right: 65,
}

const StockChart = (props) => (
  <LineChart
    width={width}
    height={height}
    margin={margin}
    dataset={[{
      data: data1,
    }, {
      data: data2
    }]}
  />
)

StockChart.propTypes = {
}

StockChart.defaultProps = {
}

export default StockChart
