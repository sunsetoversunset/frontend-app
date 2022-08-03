import React from "react";
import { useParams } from 'react-router-dom';
import PhotoStrip from "./PhotoStrip"
import "../../styles/MapView.scss"

export const PhotoStrips = () => {
  const state = useParams();
  const { years: yearsStr } = state;
  const years = (yearsStr) ? yearsStr.split(',').map(y => parseInt(y)) : [1966, 1973, 1985, 1995, 2007];

  // ---------------------------------------------------------------
  return (
      <div className={`strips-container`}>
        {years.map(year => {
          return (
            <PhotoStrip
              year={year}
              key={`year-${year}`}
            />
          )
        })}
      </div>
  )
}

export default PhotoStrips;