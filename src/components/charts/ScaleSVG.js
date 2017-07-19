import React from 'react'

const ScaleSVG = ({
  children,
  width,
  height,
  xOrigin = 0,
  yOrigin = 0,
  preserveAspectRatio = 'xMinYMin meet',
}) => (
  <div style={{
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    verticalAlign: 'top',
    overflow: 'hidden',
  }}>
    <svg
      preserveAspectRatio={preserveAspectRatio}
      viewBox={`${xOrigin} ${yOrigin} ${width} ${height}`}
    >
      {children}
    </svg>
  </div>
)

export default ScaleSVG