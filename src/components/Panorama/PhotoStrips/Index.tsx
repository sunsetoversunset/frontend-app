import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as d3 from 'd3';
import { useAppContext, useIsValidAddress, usePanoramaData } from "../../../hooks";
import { getAddressOffsetString } from "../../../utiliities";
import PhotoStrip from "./PhotoStrip/Index";
import AddressBar from "./AddressBar/Index";
import Years from './Years';
import XBar from "./XBar";
import * as Styled from './styled';

export const Panorama = () => {
  const isValidAddress = useIsValidAddress();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const refining = pathname.startsWith("/refine");
  const { width } = useAppContext();
  const ref = useRef(null);
  const yearsRef = useRef(null);

  const {
    x,
    minX,
    maxX,
    direction,
    years
  } = usePanoramaData();
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    setTranslateX(0);
    d3.select(ref.current).style("transform", `translateX(0px)`);
    d3.select(yearsRef.current).style("transform", `translateX(0px)`);
  }, [x]);

  const startDragX = useRef<number | undefined>();
  const clientX = useRef<number>();

  if (!isValidAddress) {
    navigate("/n/");
    return null;
  }

  const handleDragStart = (e: any) => {
    startDragX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number);
  };

  function handleDrag(e: any) {
    clientX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number);
    if (startDragX.current && clientX.current) {
      let distance = startDragX.current - clientX.current;
      if (x + distance < minX || x + distance > maxX) {
        distance = 0;
      }
      if (startDragX.current && Math.abs(distance) > 3) {
        d3.select(ref.current).style("transform", `translateX(${distance * -1}px)`);
        d3.select(yearsRef.current).style("transform", `translateX(${distance}px)`);
      }
    }
  }

  const handleDragEnd = (e: any) => {
    clientX.current = (e?.clientX as number) || (e?.touches[0]?.clientX as number) || clientX?.current;
    if (startDragX.current && clientX.current) {
      let distance = startDragX.current - clientX.current;
      if (x + distance < minX || x + distance > maxX) {
        distance = 0;
      }
      if (startDragX.current && Math.abs(distance) > 3) {
        setTranslateX(0);
        navigate(`../../${getAddressOffsetString(x + distance, direction, { direction })}x/${years.join(",")}`);
      }
      startDragX.current = undefined;
      clientX.current = undefined;
    }
  };

  return (
    <Styled.Panorama
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onPointerLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      width={width}
      translateX={translateX}
      ref={ref}
    >
      {refining && <XBar />}
      <AddressBar />
      {years.map(year => (
        <PhotoStrip
          year={year}
          key={`year-${year}`}
        />
      ))}
      <Styled.YearsContainer
        ref={yearsRef}
      >
        <Years />
      </Styled.YearsContainer>
    </Styled.Panorama>
  );
};

export default Panorama;
