import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { StripLabel } from '../../index.d';

type StripLabelWithXY = StripLabel & { x: number, y: number };

const MapMarker = (props: { labels: StripLabelWithXY[], label: StripLabelWithXY }) => {
  const [translate, setTranslate] = useState(`translate(${props.label.x} ${props.label.y})`);
  const x = useRef(props.label.x);
  const [rotation, setRotation] = useState((props.label.direction === 'n') ? props.label.rotation + 90 : props.label.rotation - 90) ;
  const g = useRef(null);
  const halo = useRef(null);

  useEffect(() => {
    // to animate the movement of the marker as the user chooses as new address, filter to get those between the old and new marker
    const oldX = x.current;
    const newX = props.label.x;
    if (oldX !== newX) {
      const gElement = d3.select(g.current);
      const haloElement = d3.select(halo.current);
      const pointsToTraverse = props.labels
        .filter(d => (d.x > oldX && d.x <= newX) || (d.x < oldX && d.x >= newX))
        .sort((a, b) => {
          if (oldX > newX) {
            return b.x - a.x;
          }
          return a.x - b.x;
        })
        // you don't need to traverse a huge number of points, so filter it so there's no more than 11 points
        .filter((d, idx, arr) => d.x === newX || idx % Math.round(arr.length / 10) === 0);
      const transitionLength = 1500 / pointsToTraverse.length;

      const pathToTraverse = d3.path();
      pathToTraverse.moveTo(pointsToTraverse[0].x, pointsToTraverse[0].y);
      if (pointsToTraverse.length > 1) {
        pathToTraverse.lineTo(pointsToTraverse[1].x, pointsToTraverse[1].y);
      }
      console.log(pathToTraverse);

      const animateStep = (idx: number) => {
        const rotation = (pointsToTraverse[idx].direction === 'n') ? pointsToTraverse[idx].rotation + 90 : pointsToTraverse[idx].rotation - 90;
        gElement
          .transition()
          .duration(transitionLength)
          .attr('transform', `translate(${pointsToTraverse[idx].x} ${pointsToTraverse[idx].y})`)
          //.attrTween('transform', () => (t) => `translate(${pointsToTraverse[idx].x} ${pointsToTraverse[idx].y})`)
          .on('end', () => {
            if (idx === pointsToTraverse.length -1) {
              x.current = newX;
              setTranslate(`translate(${pointsToTraverse[idx].x} ${pointsToTraverse[idx].y})`);
              setRotation(rotation);
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

  }, [props.label]);

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
        transform={`rotate(${rotation})`}
        ref={halo}
      />
    </g>
  )
};

export default MapMarker;