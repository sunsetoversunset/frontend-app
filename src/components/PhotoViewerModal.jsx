import { useState } from "react"
import { Viewer } from "react-iiif-viewer"
import "../styles/PhotoViewerModal.scss"
import iconCloseWhite from "../assets/icons/icon-close-white.svg"

export const PhotoViewerModal = (props) => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  const baseIIIFUrl = "https://media.getty.edu/iiif/image/"

  // ---------------------------------------------------------
  const renderNearbyAddresses = () => {
    return (props.nearbyAddresses.map((address, idx) => {
      return <li key={`nearby-address-${idx}`}>{ address }</li>
    }))
  }

  // ---------------------------------------------------------
  return (
    <div 
      className={`modal-backdrop ${ props.isVisible ? "visible" : "hidden" }`}
    >
      <div className="modal-header">
        <div
          onClick={() => props.handleHideModal()}
          className='modal-close-icon'
        >
          <img src={iconCloseWhite} alt="icon-close-modal" />
        </div>
      </div>
      { 
        props.imgUrl !== null ?
          <Viewer iiifUrl={`${baseIIIFUrl}${props.imgUrl}/info.json`}/> : null
      }
      <div className={
        `nearby-addresses ${isExpanded ? 'expanded' : 'collapsed'}`
      }>
        <span className="nearby-addresses-label">Learn more about nearby addresses</span>
        {
          isExpanded ? 
          <ul>
            { renderNearbyAddresses() } 
          </ul> : null
        }

      </div>
      
    </div>
  )
}