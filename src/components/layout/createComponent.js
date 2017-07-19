import React from 'react'
import styled from 'styled-components'

export { css } from 'styled-components'

export const createComponent = (tag) => styled(({is, theme, ...rest}) => {
  var Comp = is || tag
  return <Comp {...rest} />
})`
  box-sizing: border-box;
`
