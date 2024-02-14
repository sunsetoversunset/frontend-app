import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext, usePanoramaData } from "../../../hooks";
import { mult } from '../../../utiliities';
import type { Direction } from '../../../index.d';

const Container = styled.div`
  height: 0;
  overflow-y: visible;
  z-index: 1001;
  position: relative;
`;
const InteractiveBar = styled.div`
  height: 40px;
  width: 100%;
  background-color: rgba(255, 0, 255, 0.75);
  font-family: monospace;
  font-size: 24px;
`;
const Tick = styled.div<{ x: number }>`
  position: absolute;
  transform: translateX(${props => props.x}px);
`;
const TickLine = styled.div`
  position: absolute;
  margin-left: -0.5px;                
  width: 1px;
  height: 40px;
  background-color: #333;
`;
const TickLabel = styled.div`
  position: absolute;
  margin-left: -40px;
  width: 80px;
  text-align: center;
`;

const getTickNums = (leftX: number, rightX: number, direction: Direction, width: number, maxX: number) => {
  const min = (direction === 'n') ? Math.ceil(leftX / mult) : Math.ceil((maxX + width / 2 - rightX) / mult);
  const max = (direction === 'n') ? Math.floor(rightX / mult) : Math.floor((maxX + width / 2 - leftX) / mult);
  return Array.apply(null, Array(1 + max - min))
    .map((_, idx) => idx + min);
};

// this renders a simple bar that can be clicked to retrieve the x coordinate for a point.
const ClickableBar = () => {
  const { width } = useAppContext();
  const { leftX, rightX, direction, maxX } = usePanoramaData();


  const [ticks, setTicks] = useState(getTickNums(leftX, rightX, direction, width, maxX));

  useEffect(() => {
    setTicks(getTickNums(leftX, rightX, direction, width, maxX));
  }, [leftX, rightX, direction, width, maxX]);

  const ticksWithXs = ticks.map(tick => ({
    tick,
    x: (direction === 'n') ? tick * mult - leftX : ((maxX + width / 2 - leftX) / mult - tick) * mult,
  }));

  return (
    <Container>
      <InteractiveBar
        onMouseDown={(e) => {
          const x = (direction === 'n') ? (leftX + e.clientX) / mult : (maxX + width / 2 - leftX - e.clientX) / mult;
          navigator.clipboard.writeText(x.toString()).then(() => {
            alert(`coord: ${x}\n\nCopied to clipboard`);
          });
        }}
      >
        {ticksWithXs.map(tickWithX => (
          <Tick
            x={tickWithX.x}
            key={`tick-${tickWithX.x}-${tickWithX.tick}`}
          >
            <TickLine />
            <TickLabel>{tickWithX.tick}</TickLabel>
          </Tick>
        ))}
      </InteractiveBar>
    </Container >
  );
}

export default ClickableBar;
