import { useRef, useEffect, useState } from "react"
import "../styles/PhotoStrip.scss"

export const PhotoStripAddress = (props) => {
  const [isVisible] = useState(true)
  const stripContainer = useRef(null)

  // ---------------------------------------------------------------
  return (
    <>
      <div ref={stripContainer} className={`strip-container ${isVisible ? '' : 'hidden'}`}>
        <div className={`strip-photos-container-address year-${props.year}`}>
          {props.photoData.map((row, key) => (
            <img
              alt=''
              className="address"
              src={`https://media.getty.edu/iiif/image/${row.photoId}/full/,250/0/default.jpg`}
              key={row.photoId}
            />
          ))}
        </div>
      </div>
      <div className={`strip-year-label-outer-container 
        ${isVisible ? '' : 'hidden'}
      `}>
        <div className="strip-year-label-inner-container">
          <span className="strip-year-label">{props.year}</span>
        </div>
      </div>
    </>
  )
}