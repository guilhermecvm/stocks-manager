import { connect } from 'react-redux'
import { stock } from '../../actions/index'

import App from './App'

const mapStateToProps = (state, ownProps) => ({
  stocks: state.stocks.allIds.map(id => state.stocks.byId[id])
})

const mapDispatchToProps = {
  getStocks: stock.getAll
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
