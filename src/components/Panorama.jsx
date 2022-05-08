import React from "react";
import Map from "./Map";
import MapControls from './MapControls.tsx';
import AddressBar from './AddressBar';
import PhotoStrips from "./PhotoStrips";
import "../styles/Panorama.scss"

export const MapView = () => {

  // ---------------------------------------------------------------
  // CONTROLS
  // const moveSpeedOpts = {
  //   "slow": 0.2,
  //   "medium": 0.8,
  //   "fast": 0.6
  // }

  // ---------------------------------------------------------------
  return (
    <div id='panorama'>
      <Map />
      <MapControls />
      <AddressBar />
      <PhotoStrips />
    </div>
  )
}

export default MapView;