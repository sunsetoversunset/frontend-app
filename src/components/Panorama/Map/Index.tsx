import React from "react";
import MapMarker from './Marker';
import { useAppContext } from "../../../hooks";
import Base from './Base';
import SelectableAddresses from './SelectableAddresses/Index';
import '../../../styles/Map.scss';

const Map = () => {
  const { width } = useAppContext();

  return (
    <div className='map'>
      <svg
        width={width}
        height={200}
      >
        <Base />
        <g transform={`translate(${width / 2} 75) rotate(0)`}>
          <SelectableAddresses />
          <MapMarker />
        </g>
      </svg>
    </div>
  )
}

export default Map;