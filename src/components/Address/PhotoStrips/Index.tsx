import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useAppContext, useAddressData, usePhotoStrip } from '../../../hooks';
import { getLabelFromAddress } from '../../../utiliities';
import PhotoStrip from "../../Panorama/PhotoStrips/PhotoStrip/Index";
import Year from "../../Panorama/PhotoStrips/Year";
import * as Styled from "../../Panorama/PhotoStrips/styled"

export const PhotoStrips = () => {
  const years = [1966, 1973, 1985, 1995, 2007];
  const { width } = useAppContext();
  const { addressData, address } = useAddressData();
  // use the 2007 values to get the far left and right x coordinates as 2007 stretches the whole length of the strip
  const { farLeftX, farRightX, leftX, rightX } = usePhotoStrip(2007);
  // todo: fix this issue with addressData being potentially undefined
  const x = (addressData?.side) ? getLabelFromAddress(address, addressData.side).x * 3.25 : 0;
  const ref = useRef(null);
  const yearsRef = useRef(null);

  const startDragX = useRef<number | undefined>();
  const clientX = useRef<number>();

  const [translateX, setTranslateX] = useState(0);
  const [translateXYears, setTranslateXYears] = useState(0);

  useEffect(() => {
    d3.select(ref.current)
      .transition()
      .duration(1500)
      .style('transform', 'translateX(0px)')
      .on('end', () => {
        setTranslateX(0);
      })
  }, [address]);

  if (!addressData) {
    return null;
  }
  const reachedLeftEdge = (distance: number) => translateX - distance >= leftX - farLeftX;
  const reachedRightEdge = (distance: number) => translateX - distance <= leftX - farRightX + width / 2;

  const handleDragStart = (e: any) => {
    startDragX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number);
  };

  function handleDrag(e: any) {
    clientX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number);
    if (startDragX.current && clientX.current) {
      let distance = startDragX.current - clientX.current;
      if (reachedLeftEdge(distance) || reachedRightEdge(distance)) {
        distance = 0;
      }
      if (startDragX.current && Math.abs(distance) > 3) {
        d3.select(ref.current).style("transform", `translateX(${translateX - distance}px)`);
        d3.select(yearsRef.current).style("transform", `translateX(${translateX - distance * -1}px)`);
      }
    }
  }

  const handleDragEnd = (e: any) => {
    clientX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number) || clientX?.current;
    if (startDragX.current && clientX.current) {
      let distance = startDragX.current - clientX.current;

      if (reachedLeftEdge(distance) || reachedRightEdge(distance)) {
        distance = 0;
      }
      startDragX.current = undefined;
      clientX.current = undefined;
      setTranslateX(translateX - distance);
      setTranslateXYears(translateX - distance * -1);
    }
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onPointerLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      style={{
        width: width,
        overflowX: "visible",
        transform: `translateX(${translateX}px)`,
      }}
      ref={ref}
    >
      {years.map(year => {
        return (
          <PhotoStrip
            year={year}
            key={`year-${year}`}
          />
        )
      })}
      <Styled.YearsContainer
        style={{
          transform: `translateX(${translateXYears}px)`,
        }}
        ref={yearsRef}
      >
        {years.map(year => {
          return (
            <Year
              year={year}
              key={`year-${year}`}
            />
          )
        })}
      </Styled.YearsContainer>
      
    </div>
  )
}

export default PhotoStrips;