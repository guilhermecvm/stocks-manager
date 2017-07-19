import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box} from 'grid-styled'

import StockChart from '../../components/StockChart'
import StockTransactions from '../../components/StockTransactions'
import StockStats from '../../components/StockStats'
import StockHolding from '../../components/StockHolding'
import { Heading } from '../../components/layout'

class Stock extends React.Component {
  componentDidMount() {
    this.props.getStock(this.props.match.params.stock)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.stock !== this.props.match.params.stock) {
      this.props.getStock(nextProps.match.params.stock)
    }
  }

  render() {
    const { stock } = this.props

    return (
      <Flex direction="column">
        <Heading>{stock.code}</Heading>
        <Flex wrap="wrap" align="flex-start">
          <Box w={[1, 1, 1, 4/6]}>
            <StockChart />
          </Box>
          <Box
            w={[1, 1, 1, 2/6]}
            p={10}
            style={{backgroundColor: '#2D2F43'}}
          >
            <StockTransactions transactions={stock.transactions} />
          </Box>
        </Flex>

        <Flex wrap="wrap" align="flex-start" direction="column">
          <Box
            mt={20}
            p={10}
            w={[1, 1, 1, 4/6]}
            style={{backgroundColor: '#2D2F43'}}
          >
            <StockStats
              avgCost={stock.avgCost}
              currentPrice={stock.currentPrice}
              shares={stock.shares}
              marketValue={stock.marketValue}
              unrealizedPLPCT={stock.holding.unrealized.plPct}
            />
          </Box>

          <Box
            mt={20}
            p={10}
            w={[1, 1, 1, 4/6]}
            style={{backgroundColor: '#2D2F43'}}
          >
            <StockHolding holding={stock.holding} />
          </Box>
        </Flex>
      </Flex>
    )
  }
}

Stock.propTypes = {
  stock: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    transactions: PropTypes.array,
    holding: PropTypes.object
  })
}

Stock.defaultProps = {
  stock: {
    code: '',
    name: '',
    transactions: [],
    holding: {
      total: {
        buy: 0,
        sell: 0,
        pl: 0,
        plPct: 0
      },
      unrealized: {
        buy: 0,
        sell: 0,
        pl: 0,
        plPct: 0
      },
      realized: {
        buy: 0,
        sell: 0,
        pl: 0,
        plPct: 0
      }
    }
  }
}

export default Stock
