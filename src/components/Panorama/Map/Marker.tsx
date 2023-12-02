import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { usePanoramaData, useAddresses } from "../../../hooks";

const MapMarker = () => {
  const { direction, mapX, mapY, rotation } = usePanoramaData();
  const addresses = useAddresses(direction);
  const [translate, setTranslate] = useState(`translate(${mapX} ${mapY})`);
  const [markerRotation, setMarkerRotation] = useState((direction === 'n') ? rotation + 90 : rotation - 90);
  console.log(rotation);
  const [d, setD] = useState<string | undefined>();
  const x = useRef(mapX);
  const y = useRef(mapY);
  const g = useRef(null);
  const halo = useRef(null);
  const pathSeg = useRef(null);

  // create a path to traverse if the address changes
  useEffect(() => {
    // to animate the movement of the marker as the user chooses as new address, filter to get those between the old and new marker
    const oldX = x.current;
    const newX = mapX;

    if (!d && oldX !== newX && addresses?.length > 0) {
      const pointsToTraverse = addresses
        .filter(d => (d.mapX >= oldX && d.mapX <= newX) || (d.mapX <= oldX && d.mapX >= newX))
        .sort((a, b) => (mapX > x.current) ? a.mapX - b.mapX : b.mapX - a.mapX); 

      const pathToTraverse = d3.path();
      pathToTraverse.moveTo(x.current, y.current);
      pointsToTraverse.forEach(point => {
        pathToTraverse.lineTo(point.mapX, point.mapY);
      })
      setD(pathToTraverse.toString());
    }
  }, [mapX, addresses, d, direction]);

  // if there is a path to traverse, animate the marker along it.
  useEffect(() => {
    if (d) {
      const gElement = d3.select(g.current);

      // Tween function for moving to right.
      const translate = (node: SVGPathElement) => {
        const l = node.getTotalLength();
        return () => {
          return (t: number) => {
            const p = node.getPointAtLength(t * l);
            return 'translate(' + p.x + ',' + p.y + ')';
          };
        };
      }

      if (pathSeg.current && d) {
        const node = d3.select(pathSeg.current).node() as SVGPathElement;
        gElement
          .transition()
          .duration(1500)
          .attrTween('transform', translate(node))
          .on('end', () => {
            x.current = mapX;
            y.current = mapY;
            setTranslate(`translate(${mapX} ${mapY})`);
            //setMarkerRotation(rotation);    
            setD(undefined);
          });
      }
    }


  }, [d, mapX, mapY]);

  useEffect(() => {
    d3.select(halo.current)
      .transition()
      .duration(1500)
      .attr('transform', `rotate(${(direction === 'n') ? rotation + 90 : rotation - 90})`)
      .on('end', () => {
        setMarkerRotation((direction === 'n') ? rotation + 90 : rotation - 90);
      });
  }, [rotation, direction])

  return (
    <>
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
      {
        (d) && (
          <path
            d={d}
            stroke='transparent'
            fill='transparent'
            strokeWidth='15'
            ref={pathSeg}
          />
        )
      }
    </>
  )
};

export default MapMarker;