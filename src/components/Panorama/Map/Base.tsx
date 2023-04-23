import React from "react";
import { convertLattoY, convertLngtoX } from '../../../utiliities';
import { useAppContext, useRoadPath } from "../../../hooks";
import * as Styled from './styled';

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
    lng: -118.297
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
  },
  {
    label: "Thai Town",
    lat: 34.1085,
    lng: -118.303
  },
  {
    label: "Little Armenia",
    lat: 34.102,
    lng: -118.3
  }
]

const Base = () => {
  const { width } = useAppContext();

  // the width of the map relative to the width of the full screen and the svg path for the road
  const mapWidth = width * 0.9;
  const mapHeight = Math.min(200, width / 3);
  const { activePath, completePath } = useRoadPath();

  return (
    <svg
      width={width}
      height={mapHeight}
    >
      <g transform={`translate(${width / 2} ${mapHeight / 2}) rotate(0)`}>

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
        {MapLabels.map(mapLabel => (
          <g>
            <Styled.MapLabelHalo
              x={convertLngtoX(mapLabel.lng, mapWidth)}
              y={convertLattoY(mapLabel.lat, mapHeight)}
              key={`label for ${mapLabel.label}`}
            >
              {mapLabel.label.toUpperCase()}
            </Styled.MapLabelHalo>
            <Styled.MapLabel
              x={convertLngtoX(mapLabel.lng, mapWidth)}
              y={convertLattoY(mapLabel.lat, mapHeight)}
              key={`label for ${mapLabel.label}`}
            >
              {mapLabel.label.toUpperCase()}
            </Styled.MapLabel>
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Base;