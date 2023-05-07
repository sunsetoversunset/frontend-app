import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { usePanoramaData, useAddresses } from "../../../hooks";

const MapMarker = () => {
  const { direction, mapX, mapY, rotation } = usePanoramaData();
  const addresses = useAddresses(direction);
  const [translate, setTranslate] = useState(`translate(${mapX} ${mapY})`);
  const [markerRotation, setMarkerRotation] = useState((direction === 'n') ? rotation + 90 : rotation - 90) ;
  const x = useRef(mapX);
  const g = useRef(null);
  const halo = useRef(null);

  useEffect(() => {
    // to animate the movement of the marker as the user chooses as new address, filter to get those between the old and new marker
    const oldX = x.current;
    const newX = mapX;
    if (oldX !== newX && addresses && addresses.length > 0) {
      const gElement = d3.select(g.current);
      const haloElement = d3.select(halo.current);
      const pointsToTraverse = addresses
        .filter(d => (d.mapX > oldX && d.mapX <= newX) || (d.mapX < oldX && d.mapX >= newX))
        .sort((a, b) => {
          if (oldX > newX) {
            return b.mapX - a.mapX;
          }
          return a.mapX - b.mapX;
        })
        // you don't need to traverse a huge number of points, so filter it so there's no more than 11 points
        .filter((d, idx, arr) => d.mapX === newX || idx % Math.round(arr.length / 10) === 0);
      const transitionLength = 1500 / pointsToTraverse.length;

      const pathToTraverse = d3.path();
      if (pointsToTraverse.length > 0) {
        pathToTraverse.moveTo(pointsToTraverse[0].mapX, pointsToTraverse[0].mapY);
        if (pointsToTraverse.length > 1) {
          pathToTraverse.lineTo(pointsToTraverse[1].mapX, pointsToTraverse[1].mapY);
        }
      }

      const animateStep = (idx: number) => {
        const rotation = (pointsToTraverse[idx].direction === 'n') ? pointsToTraverse[idx].rotation + 90 : pointsToTraverse[idx].rotation - 90;
        gElement
          .transition()
          .duration(transitionLength)
          .attr('transform', `translate(${pointsToTraverse[idx].mapX} ${pointsToTraverse[idx].mapY})`)
          //.attrTween('transform', () => (t) => `translate(${pointsToTraverse[idx].mapX} ${pointsToTraverse[idx].mapY})`)
          .on('end', () => {
            if (idx === pointsToTraverse.length -1) {
              x.current = newX;
              setTranslate(`translate(${pointsToTraverse[idx].mapX} ${pointsToTraverse[idx].mapY})`);
              setMarkerRotation(rotation);
            } else {
              animateStep(idx + 1);
            }
          });
        haloElement
          .transition()
          .duration(transitionLength)
          .attr('transform', `rotate(${rotation})`)
      };
      if (pointsToTraverse.length > 0) {
        animateStep(0);
      }
    }

  }, [mapX, mapY, addresses]);

  useEffect(() => {
    d3.select(halo.current)
      .transition()
      .duration(500)
      .attr('transform', `rotate(${(direction === 'n') ? rotation + 90 : rotation - 90})`)
      .on('end', () => {
        setMarkerRotation((direction === 'n') ? rotation + 90 : rotation - 90);
      });
  }, [rotation, direction])

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
          <stop offset="0%" stopColor="transparent" />
          <stop offset="9%" stopColor="transparent" />
          <stop offset="15%" stopColor="red" stopOpacity={0.7} />
          <stop offset="50%" stopColor="red" stopOpacity={0.3} />
          <stop offset="100%" stopColor="red" stopOpacity={0} />
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
        cy={-5}
        r={15}
        fill="transparent"
        stroke="red"
        strokeOpacity={0.5}
        strokeWidth={25}
        strokeDasharray="25 75"
        strokeDashoffset="90"
        transform={`rotate(${markerRotation})`}
        ref={halo}
      />
    </g>
  )
};

export default MapMarker;