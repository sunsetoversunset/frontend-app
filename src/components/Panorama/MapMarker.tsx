import React, { useState, useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { PanoramaContext } from '../../Contexts';
import { PanoramaContextParams } from './index.d';
import { Point } from '../../index.d';

const MapMarker = (props: { viewPosition: Point; rotation: number }) => {
  const { scrollSpeed } = useContext(PanoramaContext) as PanoramaContextParams;
  const [translate, setTranslate] = useState(`translate(${props.viewPosition[0]} ${props.viewPosition[1]})`);
  const [rotation, setRotation] = useState(props.rotation);
  const g = useRef(null);
  const halo = useRef(null);

  useEffect(() => {
    d3.select(g.current)
      .transition()
      .duration(scrollSpeed)
      .attr('transform', `translate(${props.viewPosition[0]} ${props.viewPosition[1]})`)
      .on('end', () => {
        setTranslate(`translate(${props.viewPosition[0]} ${props.viewPosition[1]})`);
      });
    d3.select(halo.current)
      .transition()
      .duration(scrollSpeed)
      .attr('transform', `rotate(${props.rotation})`)
      .on('end', () => {
        setRotation(props.rotation);
      });
  });

  return (
    <g
      transform={translate} id='viewmarker'
      ref={g}
    >
      <defs>
        <radialGradient
          id="myGradient"
          cy={1}
        >
          <stop offset="0%" stop-color="transparent" />
          <stop offset="9%" stop-color="transparent" />
          <stop offset="15%" stop-color="red" stopOpacity={0.7} />
          <stop offset="50%" stop-color="red" stopOpacity={0.3} />
          <stop offset="100%" stop-color="red" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle
        cx={0}
        cy={0}
        r={5}
        fill='red'
      />
      <circle
        cx={0}
        cy={0}
        r={15}
        fill="transparent"
        stroke="red"
        strokeOpacity={0.5}
        strokeWidth={25}
        strokeDasharray="25 75"
        strokeDashoffset="90"
        transform={`rotate(${rotation})`}
        ref={halo}
      />
    </g>
  )
};

export default MapMarker;