import { useAppContext, useMapDimensions } from "../../../hooks";
import { convertLattoY, convertLngtoX } from '../../../utiliities';
import * as Styled from './styled';

const Scale = () => {
  const { width } = useAppContext();
  const height = Math.min(100, width / 6);

  // the width of the map relative to the width of the full screen and the svg path for the road
  const { mapWidth } = useMapDimensions();

  // these points are a mile away from one another at the same latitude
  const westLatLng = [34.1, -118.251081]
  const eastLatLng = [34.1, -118.2336];

  // convert to x, y coordinates
  const westPoint = [convertLngtoX(westLatLng[1], mapWidth), convertLattoY(westLatLng[0], height)];
  const eastPoint = [convertLngtoX(eastLatLng[1], mapWidth), convertLattoY(eastLatLng[0], height)];

  // create data for ticks every quarter mile
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((distance, idx) => ({
    distance,
    x: westPoint[0] + (eastPoint[0] - westPoint[0]) * distance,
    // set a boolean whether to show the text or not so the labels don't overlap on narrow screens
    showLabel: (distance === 0 || distance === 1) || (width >= 775 && distance === 0.5) || width >= 1200,
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
          stroke='#aaaaaa'
          strokeWidth={2}
        />
        <Styled.Miles
          x={(eastPoint[0] + westPoint[0]) / 2}
          y={eastPoint[1] + 14}
        >
          miles
          {(width >= 800) && (
            <>
              <tspan
                x={(eastPoint[0] + westPoint[0]) / 2}
                dy={14}
              >
                (only east-west)
              </tspan>
            </>
          )}
        </Styled.Miles>
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
              stroke='#aaaaaa'
              strokeWidth={2}
            />
            {(tick.showLabel) && (
              <Styled.TickLabel
                y={-10}
                textAnchor="middle"
              >
                {tick.distance}
              </Styled.TickLabel>
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Scale;