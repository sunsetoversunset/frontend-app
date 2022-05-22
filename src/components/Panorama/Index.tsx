import React, { useState } from "react";
import Map from "./Map";
import MapControls from './MapControls';
import AddressBar from './AddressBar';
import PhotoStrips from "./PhotoStrips";
import { PanoramaContext } from '../../Contexts';
import "../../styles/Panorama.scss"

export const Panorama = () => {
  const [scrollSpeed, setScrollSpeed] = useState(1500);

  return (
    <PanoramaContext.Provider value={{ scrollSpeed: scrollSpeed, setScrollSpeed: setScrollSpeed }}>
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