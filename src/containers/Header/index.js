import { connect } from 'react-redux'

import Header from './Header'

const mapStateToProps = (state, ownProps) => ({
  signedIn: state.signedIn
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
