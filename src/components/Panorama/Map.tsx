import React, { useContext }  from "react";
import { useParams } from 'react-router-dom';
import MapMarker from './MapMarker';
import { AppContext } from "../../Contexts";
import { labels, parseAddrOffset, getRoadPath, latLngToXY, convertLattoY, convertLngtoX } from '../../utiliities';
import Location from './Location';
import { URLParamsPanorama } from "./index.d";
// import iconMinimize from "../../assets/icons/icon-minimize.svg"
// import iconMaximize from "../../assets/icons/icon-maximize.svg";
import '../../styles/Map.scss';

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

const Map = () => {
  const { width } = useContext(AppContext);
  const { addrOffset, years, direction } = useParams<URLParamsPanorama>();
  const { addr } = parseAddrOffset(addrOffset as string);

  // the width of the map relative to the width of the full screen and the svg path for the road
  const mapWidth = width * 0.9;
  const path = getRoadPath(mapWidth);

  // filter the labels to only get those on the side of the street we're viewing and project x and y values
  const strip_labels = labels
    .filter(d => d.direction === direction)
    .map(d => {
      const [x, y] = latLngToXY([d.lat, d.lng], mapWidth); 
      return {
        ...d,
        x,
        y,
      };
    });

  // get the label data from the address
  const addressData = strip_labels.find(d => d.label.replace(/\s+/g, '')=== addr)

  if (!addressData) {
    return null;
  }

  return (
    <div className='map'>
      <svg
        width={width}
        height={200}
      >
        <g transform={`translate(${width / 2} 75) rotate(0)`}>
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
          <path d={path}
            fill='transparent'
            stroke='#FF8A58'
            strokeWidth='10'
          />
          <path d={path}
            fill='transparent'
            stroke='#F1EEE8'
            strokeWidth='5'
          />
          {strip_labels.filter(d => d.direction === direction).map(d => (
            <Location
              to={`/panorama/${direction}/${d.label.replace(/\s+/g, '')}/${years}`}
              key={`addr${d.label}`}
              x={d.x}
              y={d.y}
              label={d.label}
            />
          ))}
          <MapMarker
            label={addressData}
            labels={strip_labels}
          />
        </g>
      </svg>
    </div>
  )
}

export default Map;