import {  useState } from "react";
import { PanoramaContext } from "../../Contexts";
import { useAppContext } from "../../hooks";
import PhotoStrips from "./PhotoStrips/Index";
import MapControls from "./Controls/Index";
import Map from "./Map/Index";
import * as Styled from "./styled";

export const Panorama = () => {
  const { media } = useAppContext();
  const [scrollDistance, setScrollDistance] = useState(media === "phone" ? 0.98 : 0.6);

  return (
    <PanoramaContext.Provider value={{ scrollDistance: scrollDistance, setScrollDistance: setScrollDistance }}>
      <Styled.Panorama>
        <Map />
        <MapControls />
        <PhotoStrips />
      </Styled.Panorama>
    </PanoramaContext.Provider>
  );
};

export default Panorama;
