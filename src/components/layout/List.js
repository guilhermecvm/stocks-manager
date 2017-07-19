import { createComponent }from './createComponent'

const List = createComponent('ul').extend`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${props => props.theme.background.secondary};
`

List.defaultProps = {
  theme: {
    background: {
      secondary: '#FFFFFF'
    }
  }
}

List.Item = createComponent('li').extend`
  &:not(:last-child) {
    border-bottom: 2px solid rgb(51, 53, 75);  
  }
`

export default List
