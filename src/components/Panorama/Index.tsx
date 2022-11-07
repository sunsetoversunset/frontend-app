import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "./Map/Index";
import MapControls from './Controls/Index';
import AddressBar from './AddressBar';
import PhotoStrips from "./PhotoStrips";
import { PanoramaContext } from '../../Contexts';
import { useIsValidAddress } from "../../hooks";
import "../../styles/Panorama.scss"

export const Panorama = () => {
  const [scrollDistance, setScrollDistance] = useState(0.6);
  const isValidAddress = useIsValidAddress();
  const navigate = useNavigate();

  if (!isValidAddress) {
    navigate('/panorama/n/');
    return null;
  }

  return (
    <PanoramaContext.Provider value={{ scrollDistance: scrollDistance, setScrollDistance: setScrollDistance }}>
      <div
        id='panorama'
      >
        <Map />
        <MapControls />
        <AddressBar />
        <PhotoStrips />
      </div>

    </PanoramaContext.Provider>
  )
}

export default Panorama;