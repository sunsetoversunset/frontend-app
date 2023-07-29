import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useAppContext, useAddressData, usePhotoStrip } from '../../../hooks';
import PhotoStrip from "../../Panorama/PhotoStrips/PhotoStrip/Index";
import Year from "../../Panorama/PhotoStrips/Year";

export const PhotoStrips = () => {
  const { width } = useAppContext();
  const { addressData, address } = useAddressData();
  // use the 2007 values to get the far left and right x coordinates as 2007 stretches the whole length of the strip
  // and is guaranteed to to have photos
  const { farLeftX, farRightX, leftX, rightX } = usePhotoStrip(2007);

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
      });
    d3.select(yearsRef.current)
      .transition()
      .duration(1500)
      .style('transform', 'translateX(0px)')
      .on('end', () => {
        setTranslateXYears(0);
      })
  }, [address]);

  if (!addressData) {
    return null;
  }

  // set the years that have photos
  const years = addressData.photos
    .map(d => d.year)
    .sort()
    .filter((d, idx, array) => array.indexOf(d) === idx);

  // set the max and min values for the translation
  const maxTranslateX = leftX - farLeftX;
  const minTranslateX = rightX - farRightX;

  const handleDragStart = (e: any) => {
    startDragX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number);
  };

  function handleDrag(e: any) {
    clientX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number);
    if (startDragX.current && clientX.current) {
      let distance = startDragX.current - clientX.current;
      if (startDragX.current && Math.abs(distance) > 3) {
        const newTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, translateX - distance));
        d3.select(ref.current).style("transform", `translateX(${newTranslateX}px)`);
        d3.select(yearsRef.current).style("transform", `translateX(${newTranslateX * -1}px)`);
      }
    }
  }

  const handleDragEnd = (e: any) => {
    clientX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number) || clientX?.current;
    if (startDragX.current && clientX.current) {
      let distance = startDragX.current - clientX.current;
      const newTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, translateX - distance));
      startDragX.current = undefined;
      clientX.current = undefined;
      setTranslateX(newTranslateX);
      setTranslateXYears(newTranslateX * -1);
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
      <div
        style={{
          position: "absolute",
          top: 0,
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
      </div>
      
    </div>
  )
}

export default PhotoStrips;