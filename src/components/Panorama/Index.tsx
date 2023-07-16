import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as d3 from 'd3';
import { PanoramaContext } from "../../Contexts";
import { useAppContext, useIsValidAddress, usePanoramaData } from "../../hooks";
import { getAddressOffsetString } from '../../utiliities';
import PhotoStrips from "../PhotoStrips/Index";
import AddressBar from "./AddressBar/Index";
import Years from './Years';
import MapControls from "./Controls/Index";
import Map from "./Map/Index";
import XBar from "./XBar";
import * as Styled from "./styled";

export const Panorama = () => {
  const { media } = useAppContext();
  const [scrollDistance, setScrollDistance] = useState(media === "phone" ? 0.98 : 0.6);
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
    <PanoramaContext.Provider value={{ scrollDistance: scrollDistance, setScrollDistance: setScrollDistance }}>
      <Styled.Panorama>
        <Map />
        <MapControls />
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
            transform: `translateX(${translateX}}px)`,
            overflowX: "visible",
          }}
          ref={ref}
        >
          {refining && <XBar />}
          <AddressBar />
          <PhotoStrips />
          <div
            style={{
              position: "absolute",
              top: 40,// the height of the address bar
            }}
            ref={yearsRef}
          >
            <Years />
          </div>
        </div>
      </Styled.Panorama>
    </PanoramaContext.Provider>
  );
};

export default Panorama;
