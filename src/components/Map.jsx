import { useRef, useEffect, useState, useContext } from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import { DimensionsContext } from '../Contexts';
import { addressToCoordinateUnflipped, getOppositeX, mult, coordinateToPoint, calcAddrOffset, toggleDirectionAddrOffset, parseAddrOffset } from '../utiliities.ts';
import * as d3 from 'd3'
import "../styles/Map.scss";
import GeoJson from '../assets/data/sunset.json'
import StripLabels from '../assets/data/strip_labels.json';
import { crossStreets } from '../assets/data/crossStreets'
import iconMinimize from "../assets/icons/icon-minimize.svg"
import iconMaximize from "../assets/icons/icon-maximize.svg";
import '../styles/Map.scss';

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
const Map = (props) => {
  const { width } = (useContext(DimensionsContext));
  const state = useParams();
  const { addrOffset, years, direction } = state;
  const { addr, offset } = parseAddrOffset(addrOffset);
  const newCenter = (addr) ? addressToCoordinateUnflipped(addr) + offset : width / 2;

  // filter the labels to only get those on the side of the street we're viewing
  const strip_labels = StripLabels
    .filter((d, idx) => StripLabels.findIndex(_d => _d.l === d.l) === idx)
    .map(d => ({
      ...d,
      c: (d.s === 'n') ? d.c : getOppositeX(d.c * mult) / mult,
    }))
    .sort((a, b) => a.c - b.c);

  // connect the address points to draw the road (as a path, not a line)
  const points = GeoJson.geometry.coordinates[0];
  const lineSegments = points
    .slice(1)
    .map((point) => `L ${point[0]} ${point[1] * -1}`);
  const path = `M ${points[0][0]} ${points[0][1] * -1} ${lineSegments.join(" ")}`;

  const maxCoordinate = Math.max(...StripLabels.map(d => d.c * mult));

  const coordinateRotation = (coordinate) => {
    // find the point it's on or points it's between
    const percentAlongPath = coordinate / maxCoordinate;
    const pointsBelow = strip_labels
      .filter(d => d.c * mult / maxCoordinate <= percentAlongPath);
    const pointBelow = (pointsBelow.length > 0) ? pointsBelow[pointsBelow.length - 1] : null;
    const pointsAbove = strip_labels
      .filter(d => d.c * mult / maxCoordinate >= percentAlongPath);
    const pointAbove = pointsAbove[0];

    if (pointBelow.c === pointAbove.c) {
      return pointAbove.r;
    }

    const percentAlongPathLowerPoint = pointBelow.c * mult / maxCoordinate;
    const percentAlongPathHigherPoint = pointAbove.c * mult / maxCoordinate;

    // figure out how close the coordinate is to each of the points
    const rotation = pointAbove.r; //pointBelow.rotation +  * (percentAlongPath - pointBelowPercent) * (percentAlongPath - pointAbovePercent);
    return rotation;
  }

  console.log(newCenter);
  const [lng, lat] = coordinateToPoint(newCenter, maxCoordinate, strip_labels);
  const rotation = coordinateRotation(newCenter / mult);
  console.log(lng, lat, rotation, newCenter / mult);
  const viewPosition = (direction === 'n')
    ? [Math.cos((rotation + 180) * Math.PI / 180) * 0.003 + lng, Math.sin((rotation + 180) * Math.PI / 180) * 0.003 + lat]
    : [Math.cos((rotation + 180) * Math.PI / 180) * -0.003 + lng, Math.sin((rotation + 180) * Math.PI / 180) * -0.003 + lat];

  // ---------------------------------------------------------
  return (

    <div className='map'>
      <svg
        width={1000}
        height={250}
      >
        <g transform='scale(5000 4000) translate(118.399, 34.105) rotate(-10 -118.31 -34.0855) '>
          <path d={path}
            fill='transparent'
            stroke='#FF8A58'
            strokeWidth='0.0015'
          />
          <path d={path}
            fill='transparent'
            stroke='#F1EEE8'
            strokeWidth='0.0004'
          />
          {strip_labels.filter(d => d.s === direction).map(d => (
            <g key={`addr${d.l}`}>
              <Link
                to={`/panorama/${direction}/${d.l}/${years}`}
              >
                <circle
                  cx={d.lng}
                  cy={d.lat * -1}
                  r={0.001}
                  fill='transparent'
                />
              </Link>
            </g>
          ))}
          <g transform={`rotate(${((direction === 'n') ? rotation + 90 + 3 : rotation - 90 + 3)} ${viewPosition[0]} -${viewPosition[1]}) scale(${1 / 5000} ${1 / 4000}) translate(${viewPosition[0] * 5000} ${viewPosition[1] * -1 * 4000})`}>
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
              stroke="green"
              strokeOpacity={0.5}
              strokeWidth={15}
              strokeDasharray="25 75"
              strokeDashoffset="90"
            />
           {/* <line
              x1={-100}
              x2={100}
              y1={0}
              y2={0}
              strokeWidth={1}
              stroke='black'
          /> */}
          </g> 
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