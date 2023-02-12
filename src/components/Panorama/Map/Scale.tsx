import React from "react";
import { useAppContext } from "../../../hooks";
import { convertLattoY, convertLngtoX } from '../../../utiliities';


const Base = () => {
  const { width } = useAppContext();

  // the width of the map relative to the width of the full screen and the svg path for the road
  const mapWidth = width * 0.9;

  // these points are a mile away from one another at the same latitude
  const westLatLng = [34.1, -118.251081]
  const eastLatLng = [34.1, -118.2336];

  // convert to x, y coordinates
  const westPoint = [convertLngtoX(westLatLng[1], mapWidth), convertLattoY(westLatLng[0])];
  const eastPoint = [convertLngtoX(eastLatLng[1], mapWidth), convertLattoY(eastLatLng[0])];

  // create data for ticks every quarter mile
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((distance, idx) => ({
    distance,
    x: westPoint[0] + (eastPoint[0] - westPoint[0]) * distance,
  }));

  return (
    <svg
      width={width}
      height={250}
    >
      <g transform={`translate(${width / 2} 100) rotate(0)`}>
        <line
          x1={westPoint[0]}
          x2={eastPoint[0]}
          y1={westPoint[1]}
          y2={eastPoint[1]}
          stroke='grey'
          strokeWidth={2}
        />
        <text
          x={(eastPoint[0] + westPoint[0]) / 2}
          y={eastPoint[1] + 18}
          textAnchor="middle"
        >
          MILES
        </text>
        {ticks.map(tick => (
          <g
            transform={`translate(${tick.x} ${westPoint[1]})`}
            key={`tickFor${tick.distance}`}
          >
            <line
              x1={0}
              x2={0}
              y1={-5}
              y2={0}
              stroke='grey'
              strokeWidth={2}
            />
            <text
              y={-10}
              textAnchor="middle"
            >
              {tick.distance}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Base;