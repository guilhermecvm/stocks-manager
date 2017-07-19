import PropTypes from 'prop-types'
import { createComponent }from './createComponent'

const NavLink = createComponent('a').extend`
  display: inline-block;
  text-decoration: none;
  color: inherit;
`

NavLink.propTypes = {
  active: PropTypes.bool
}

export default NavLink
