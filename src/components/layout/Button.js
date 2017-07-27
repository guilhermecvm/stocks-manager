import PropTypes from 'prop-types'
import { createComponent }from './createComponent'

const Button = createComponent('button').extend`
  display: inline-block;
	border-radius: 3px;
	padding: 0.3rem 0.5rem;
	margin: 0.5rem;
	background: transparent;
	color: white;
	border: 1px solid white;
	cursor: pointer;
	
	&:hover {
	  background: white;
	  color: black;
	}	
`

Button.propTypes = {
}

export default Button
