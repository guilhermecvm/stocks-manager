import { connect } from 'react-redux'
import { stock } from '../../actions/index'

import Stock from './Stock'

const mapStateToProps = (state, ownProps) => ({
  stock: state.stocks.byId[ownProps.match.params.stock]
})

const mapDispatchToProps = {
  getStock: stock.get
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
