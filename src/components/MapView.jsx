import React from "react"
import { NavHeader } from "./NavHeader"
import { PhotoStrip } from "./PhotoStrip"
import { Map } from "./Map"
import { PhotoViewerModal } from "./PhotoViewerModal"
import { AddressBar } from "./AddressBar"
import { Footer } from "./Footer"
import "../styles/MapView.scss"

export const MapView = () => {
  const years = [1966, 1973, 1985, 1995, 2007];

  // ---------------------------------------------------------------
  // CONTROLS
  const moveSpeedOpts = {
    "slow": 0.2,
    "medium": 0.8,
    "fast": 0.6
  }

  // ---------------------------------------------------------------
  return (
    <div className="app-page">
      {/* <PhotoViewerModal
        nearbyAddresses={nearbyAddresses}
        imgObj={modalImg}
        handleHideModal={() => setIsModalShowing(false)}
        isVisible={isModalShowing}
  /> *
      <div
        onClick={() => setIsSearchAndFilterShowing(false)}
        className={
          `strips-shade ${isMapMinimized ? "full" : "minimized"} ${isSearchAndFilterShowing === true ? "visible" : "hidden"}`}>
        </div> */}
      <NavHeader />

      <div className="map-and-controls-container">
        <Map />
        <AddressBar />
      </div>
      <div className={`strips-container`}>
        {years.map(year => {
          return (
            <PhotoStrip
              year={year}
              key={`year-${year}`}
            />
          )
        })}
        <Footer />
      </div>
    </div>
  )
}

export default MapView;