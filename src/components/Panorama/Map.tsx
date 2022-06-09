import React from "react";
import { useParams } from 'react-router-dom';
import MapMarker from './MapMarker';
import { addressToCoordinateUnflipped, getOppositeX, mult, coordinateToPoint, parseAddrOffset, getRoadPath, latLngToXY, convertLattoY, convertLngtoX } from '../../utiliities';
import StripLabels from '../../assets/data/strip_labels.json';
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
    label: "Silver Lake",
    lat: 34.087896,
    lng: -118.265
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
  }
]

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
const Map = () => {
  const { addrOffset, years, direction } = useParams<URLParamsPanorama>();
  const { addr } = parseAddrOffset(addrOffset as string);
  const newCenter = addressToCoordinateUnflipped(addr);

  // filter the labels to only get those on the side of the street we're viewing
  const strip_labels = StripLabels
    .filter((d, idx) => StripLabels.findIndex(_d => _d.l === d.l) === idx)
    .map(d => {
      const [x, y] = latLngToXY([d.lat, d.lng]);
      return {
        ...d,
        x,
        y,
        c: (d.s === 'n') ? d.c : getOppositeX(d.c * mult) / mult,
      };
    })
    .sort((a, b) => a.c - b.c);

  /* the svg path for the road */
  const path = getRoadPath();

  const maxCoordinate = Math.max(...StripLabels.map(d => d.c * mult));

  // const coordinateRotation = (coordinate: number) => {
  //   // find the point it's on or points it's between
  //   const percentAlongPath = coordinate / maxCoordinate;
  //   const pointsBelow = strip_labels
  //     .filter(d => d.c * mult / maxCoordinate <= percentAlongPath);
  //   const pointBelow = (pointsBelow.length > 0) ? pointsBelow[pointsBelow.length - 1] : null;
  //   const pointsAbove = strip_labels
  //     .filter(d => d.c * mult / maxCoordinate >= percentAlongPath);
  //   const pointAbove = pointsAbove[0];

  //   if (pointBelow?.c === pointAbove.c) {
  //     return pointAbove.r;
  //   }

  //   // const percentAlongPathLowerPoint = pointBelow.c * mult / maxCoordinate;
  //   // const percentAlongPathHigherPoint = pointAbove.c * mult / maxCoordinate;

  //   // figure out how close the coordinate is to each of the points
  //   const rotation = pointAbove.r; //pointBelow.rotation +  * (percentAlongPath - pointBelowPercent) * (percentAlongPath - pointAbovePercent);
  //   return rotation + 90;
  // }


  const [x, y] = latLngToXY((coordinateToPoint(newCenter, maxCoordinate, strip_labels)).reverse() as [number, number]);
  const current_strip_label = strip_labels.find(d => d.l.toString().replace(/\s+/g, '') === addr);
  const rotation = (current_strip_label) ? current_strip_label.r + 90 : 0;

  // ---------------------------------------------------------

  return (

    <div className='map'>
      <svg
        width={1100}
        height={150}
      >
        <g transform='translate(550 75) rotate(0)'>
          {MapLabels.map(mapLabel => (
            <text
              x={convertLngtoX(mapLabel.lng)}
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
          {strip_labels.filter(d => d.s === direction).map(d => (
            <Location
              to={`/panorama/${direction}/${d.l}/${years}`}
              key={`addr${d.l}`}
              x={d.x}
              y={d.y}
              label={d.l.toString()}
            />
          ))}
          {/* rotate(${((direction === 'n') ? rotation + 90 + 3 : rotation - 90 + 3)}  */}
          <MapMarker
            viewPosition={[x, y]}
            rotation={rotation}
          />
        </g>
      </svg>
    </div>
  )
}

export default Map;