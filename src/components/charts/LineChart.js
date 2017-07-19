import React from 'react'
import { AreaClosed } from '@vx/shape'
import { AxisRight, AxisBottom } from '@vx/axis'
import { scaleTime, scaleLinear } from '@vx/scale'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { curveMonotoneX } from '@vx/curve'
// import ScaleSVG from '@vx/responsive'
// @vs/responsive not working at the moment
import ScaleSVG from './ScaleSVG'
import { extent, max } from 'd3-array'

function numTicksForHeight(height) {
  if (height <= 300) return 3
  if (300 < height && height <= 600) return 5
  return 10
}

function numTicksForWidth(width) {
  if (width <= 300) return 2
  if (300 < width && width <= 400) return 5
  return 10
}

export default ({
  margin,
  dataset,
  width,
  height,
}) => {
  if (!Array.isArray(dataset)) dataset = [dataset]

  const allData = dataset.reduce((rec, d) => {
    return rec.concat(d.data)
  }, [])

  // bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  // accessors
  const x = d => d.date
  const y = d => d.value

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(allData, x),
    nice: true,
  })
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(allData, y)],
    nice: true,
  })

  return (
    <ScaleSVG width={width} height={height}>
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f101f6"/>
          <stop offset="100%" stopColor="#01d4f9"/>
        </linearGradient>
        <linearGradient id="linearFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f101f6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#01d4f9" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <AxisRight
        top={margin.top}
        left={width - margin.right}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        stroke={'#1b1a1e'}
        tickLabelComponent={(
          <text
            textAnchor="left"
            fontSize={10}
            fill="#fff"
          />
        )}
      />
      <Group top={margin.top} left={margin.left}>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          numTicksRows={numTicksForHeight(height)}
          numTicksColumns={numTicksForWidth(width)}
          stroke={'#1b1a1e'}
          tickStroke={'#1b1a1e'}
        />

        <AreaClosed
          data={dataset[0].data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke={"url('#linear')"}
          fill={"url('#linearFade')"}
          curve={curveMonotoneX}
        />
      </Group>
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        stroke={'#1b1a1e'}
        tickStroke={'#1b1a1e'}
        tickLabelComponent={(
          <text
            textAnchor="left"
            fontSize={10}
            fill="#fff"
          />
        )}
      />
    </ScaleSVG>
  )
}