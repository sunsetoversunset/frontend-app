import React, { useState } from "react";
import Map from "./Map";
import MapControls from './MapControls';
import AddressBar from './AddressBar';
import PhotoStrips from "./PhotoStrips";
import { PanoramaContext } from '../../Contexts';
import "../../styles/Panorama.scss"

export const Panorama = () => {
  const [scrollDistance, setScrollDistance] = useState(0.4);
  

  return (
    <PanoramaContext.Provider value={{ scrollDistance: scrollDistance, setScrollDistance: setScrollDistance }}>
      <div id='panorama'>
        <Map />
        <MapControls />
        <AddressBar />
        <PhotoStrips />
      </div>
    </PanoramaContext.Provider>
  )
}

export default Panorama;