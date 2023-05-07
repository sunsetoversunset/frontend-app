import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PanoramaContext } from '../../Contexts';
import { useAppContext, useIsValidAddress } from "../../hooks";
import PhotoStrips from "../PhotoStrips/Index";
import AddressBar from './AddressBar/Index';
import MapControls from './Controls/Index';
import Map from "./Map/Index";
import XBar from './XBar';
import * as Styled from './styled';

export const Panorama = () => {
  const { media } = useAppContext();
  const [scrollDistance, setScrollDistance] = useState((media === 'phone') ? 0.98 : 0.6);
  const isValidAddress = useIsValidAddress();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const refining = pathname.startsWith('/refine');

  if (!isValidAddress) {
    navigate('/n/');
    return null;
  }

  return (
    <PanoramaContext.Provider value={{ scrollDistance: scrollDistance, setScrollDistance: setScrollDistance }}>
      <Styled.Panorama>
        <Map />
        <MapControls />
        {(refining) && (<XBar />)}
        <AddressBar />
        <PhotoStrips />
      </Styled.Panorama>
    </PanoramaContext.Provider>
  )
}

export default Panorama;