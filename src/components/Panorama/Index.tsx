import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Map from "./Map/Index";
import MapControls from './Controls/Index';
import AddressBar from './AddressBar';
import XBar from './XBar';
import PhotoStrips from "./PhotoStrips";
import { PanoramaContext } from '../../Contexts';
import { useIsValidAddress, useAppContext } from "../../hooks";
import "../../styles/Panorama.scss"

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
      <div
        id='panorama'
      >
        <Map />
        <MapControls />
        {(refining) && (<XBar />)}
        <AddressBar />
        <PhotoStrips />
      </div>

    </PanoramaContext.Provider>
  )
}

export default Panorama;