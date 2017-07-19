import React from 'react'
import PropTypes from 'prop-types'
import { createComponent, css }from './createComponent'

const Table = (props) => {
  const { columns, dataSource, className, style } = props

  return (
    <table className={className} style={style}>
      <tbody>
      {dataSource.map((data, index) => (
        <tr key={data.key || index+1}>
        {columns.map(column => (
          <td key={column.key} style={{padding: 10, textAlign: column.align}}>
            {column.render ? column.render(data[column.dataIndex], data) : data[column.dataIndex]}
          </td>
        ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.string,
    dataIndex: PropTypes.string,
    align: PropTypes.string,
    render: PropTypes.func
  })),
  dataSource: PropTypes.array,
  style: PropTypes.object,
  layout: PropTypes.string,
  bordered: PropTypes.bool

}

Table.defaultProps = {
  columns: [],
  dataSource: [],
  bordered: false
}

export default createComponent(Table).extend`
  border-collapse: collapse;
  width: 100%;
  table-layout: ${props => props.layout};
  
  ${props => props.bordered && css`
    & td:not(:last-child) {
      border-right: 2px solid #33354b
    }  
  `}
  
  & tr:not(:last-child) {
    border-bottom: 2px solid #33354b
  }
`
