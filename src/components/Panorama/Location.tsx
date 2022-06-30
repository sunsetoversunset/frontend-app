import React, { useState, useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';


const Location = (props: { to: string; x: number; y: number; label: string }) => {
  const text = useRef(null);
  const circle = useRef(null);
  return (
    <Link
      to={props.to}
      onMouseEnter={() => {
        d3.select(text.current)
          .style('fill', 'black');
          d3.select(circle.current)
          .style('stroke', 'black');
      }}
      onMouseOut={() => {
        d3.select(text.current)
          .style('fill', 'transparent');
          d3.select(circle.current)
          .style('stroke', 'transparent');
      }}
    >
      <circle
        cx={props.x}
        cy={props.y}
        r={4}
        fill='transparent'
        style={{
          stroke: 'transparent',
          strokeWidth: 1,
        }}
        ref={circle}
      />
      <text
        x={props.x}
        y={props.y - 10}
        fontSize={10}
        textAnchor='middle'
        style={{
          fill: 'transparent',
          pointerEvents: 'none',
        }}
        ref={text}
      >
        {props.label}
      </text>
    </Link>
  );
};

export default Location;
