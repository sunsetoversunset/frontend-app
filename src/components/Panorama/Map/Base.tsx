import React from "react";
import { getRoadPath, convertLattoY, convertLngtoX } from '../../../utiliities';
import { useAppContext, useRoadPath } from "../../../hooks"; 
import '../../../styles/Map.scss';

const MapLabels = [
  {
    label: "Sunset Strip",
    lat: 34.099,
    lng: -118.383
  },
  {
    label: "West Hollywood",
    lat: 34.0872301,
    lng: -118.37
  },
  {
    label: "East Hollywood",
    lat: 34.0897913,
    lng: -118.305463
  },
  {
    label: "Silver Lake",
    lat: 34.092,
    lng: -118.266
  },
  {
    label: "Chinatown",
    lat: 34.0671601,
    lng: -118.2403113
  },
  {
    label: "Angelino Heights",
    lat: 34.065,
    lng: -118.265
  },
  {
    label: "Hollywood",
    lat: 34.103,
    lng: -118.323963
  },
  {
    label: "Echo Park",
    lat: 34.0854292,
    lng: -118.262
  },
  {
    label: "Downtown",
    lat: 34.045,
    lng: -118.246
  }
]

const Base = () => {
  const { width } = useAppContext();

  // the width of the map relative to the width of the full screen and the svg path for the road
  const mapWidth = width * 0.9;
  const { activePath, completePath } = useRoadPath();

  return (
    <svg
      width={width}
      height={250}
    >
      <g transform={`translate(${width / 2} 100) rotate(0)`}>
        {MapLabels.map(mapLabel => (
          <text
            x={convertLngtoX(mapLabel.lng, mapWidth)}
            y={convertLattoY(mapLabel.lat)}
            fontSize={16}
            fill='grey'
            textAnchor="middle"
            key={`label for ${mapLabel.label}`}
          >
            {mapLabel.label.toUpperCase()}
          </text>
        ))}
        <path d={completePath}
          fill='transparent'
          stroke='#ddd'
          strokeWidth='10'
        />
        <path d={activePath}
          fill='transparent'
          stroke='#FF8A58'
          strokeWidth='10'
        />
        <path d={completePath}
          fill='transparent'
          stroke='#F1EEE8'
          strokeWidth='5'
        />
      </g>
    </svg>
  )
}

export default Base;