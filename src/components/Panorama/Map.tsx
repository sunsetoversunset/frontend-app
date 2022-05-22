import React from "react";
import { useParams, Link } from 'react-router-dom';
import MapMarker from './MapMarker';
import { addressToCoordinateUnflipped, getOppositeX, mult, coordinateToPoint, parseAddrOffset, getRoadPath, latLngToXY } from '../../utiliities';
import StripLabels from '../../assets/data/strip_labels.json';
import { Point } from "../../index.d";
import { URLParamsPanorama } from "./index.d";
// import iconMinimize from "../../assets/icons/icon-minimize.svg"
// import iconMaximize from "../../assets/icons/icon-maximize.svg";
import '../../styles/Map.scss';

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
const Map = () => {
  const { addrOffset, years, direction } = useParams<URLParamsPanorama>();
  const { addr,  } = parseAddrOffset(addrOffset as string);
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
  console.table([x, y]);
  const current_strip_label = strip_labels.find(d => d.l.toString().replace(/\s+/g, '') === addr);
  const rotation = (current_strip_label) ? current_strip_label.r + 90 : 0;
  const viewPosition: Point = (direction === 'n')
    ? [Math.cos((rotation + 90) * Math.PI / 180) * -15 + x, Math.sin((rotation + 90) * Math.PI / 180) * -15 + y]
    : [Math.cos((rotation + 90) * Math.PI / 180) * 10 + x, Math.sin((rotation + 90) * Math.PI / 180) * 10 + y];

  // ---------------------------------------------------------

  return (

    <div className='map'>
      <svg
        width={1100}
        height={150}
      >
        <g transform='translate(550 75) rotate(0)'>
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
            <g key={`addr${d.l}`}>
              <Link
                to={`/panorama/${direction}/${d.l}/${years}`}
              >
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={2}
                  fill='transparent'
                />
                <text
                  x={d.x + 3000}
                  y={d.y}
                  fontSize={10}
                  textAnchor='middle'
                >
                  {d.l}
                </text>
              </Link>
            </g>
          ))}
          {/* rotate(${((direction === 'n') ? rotation + 90 + 3 : rotation - 90 + 3)}  */}
         <MapMarker
          viewPosition={viewPosition}
          rotation={rotation}
         />
        </g>
        <text
          x={65}
          y={83}
          fontSize={16}
          fill='grey'
          textAnchor="middle"
        >
          SUNSET STRIP
        </text>
        <text
          x={300}
          y={30}
          fontSize={16}
          fill='grey'
          textAnchor="middle"
        >
          HOLLYWOOD
        </text>

        <text
          x={820}
          y={110}
          fontSize={16}
          fill='grey'
          textAnchor="middle"
        >
          CHINATOWN
        </text>

        <text
          x={700}
          y={100}
          fontSize={16}
          fill='grey'
          textAnchor="middle"
        >
          ANGELINO
          <tspan
            x={700}
            dy={18}
          >
            HEIGHTS
          </tspan>
        </text>

        <text
          x={660}
          y={30}
          fontSize={16}
          fill='grey'
          textAnchor="middle"
        >
          SILVER LAKE
        </text>




      </svg>
    </div>
  )
}

export default Map;