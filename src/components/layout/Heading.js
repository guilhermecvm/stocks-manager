import PropTypes from 'prop-types'
import { createComponent }from './createComponent'

const Heading = createComponent('h1').extend`
  color: #ffffff;
  margin: 10px 0 5px
`

Heading.propTypes = {
  active: PropTypes.bool
}

export default Heading
