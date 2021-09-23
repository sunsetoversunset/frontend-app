import { useState } from "react"
import { Viewer } from "react-iiif-viewer"
import { Link } from "react-router-dom"
import "../styles/PhotoViewerModal.scss"

import iconRightWhite from "../assets/icons/icon-right-bracket.svg"
import iconRightRust from "../assets/icons/icon-right-bracket-rust.svg"
import iconCloseWhite from "../assets/icons/icon-close-white.svg"
import iconLeftWhite from "../assets/icons/icon-left-bracket.svg"
import iconLeftRust from "../assets/icons/icon-left-bracket-rust.svg"

export const PhotoViewerModal = (props) => {
  const [ isHoveringExpand, setIsHoveringExpand ] = useState(false)
  const [ isHoveringCollapse, setIsHoveringCollapse ] = useState(false)
  const [ isExpanded, setIsExpanded ] = useState(false)
  const baseIIIFUrl = "https://media.getty.edu/iiif/image/"


  // ---------------------------------------------------------
  const generateHash = (address) => {
    let newHash = address.split('.').join("")
    newHash = newHash.replace(/\s+/g, '-').toLowerCase()
    console.log('newHash: ', newHash)
    return newHash
  }

  // ---------------------------------------------------------
  const renderNearbyAddresses = () => {
    return (props.nearbyAddresses.map((address, idx) => {
      // Ultimately these should be links that open in a new tab
      return (
        <li key={`nearby-address-${idx}`}>
          <Link
            className="nearby-address-link" 
            target="_blank"
            rel="noopener noreferrer"
            to={`/address/${generateHash(address)}`}
          >
            { address }
          </Link>
        </li>
      )
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
      <div
        onMouseEnter={() => setIsHoveringExpand(true)}
        onMouseLeave={() => setIsHoveringExpand(false)}
        className={
          `nearby-addresses ${isExpanded ? 'expanded' : 'collapsed'}`
        }
      >

        <div 
          className="nearby-addresses-label-container"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="nearby-addresses-label">
            Learn more about nearby addresses
          </span>
          {
            isExpanded === false ? 
              isHoveringExpand === true ? 
                <img src={iconRightRust} alt="icon-right-rust" /> :
                <img src={iconRightWhite} alt="icon-right-white" />
             : null
          } 
          
        </div>
        
        {
          isExpanded ? 
          <ul className="nearby-addresses-list">
            { renderNearbyAddresses() } 
          </ul> : null
        }

        {
          isExpanded ?
          <div 
            className="icon-collapse-nearby"
            onClick={() => setIsExpanded(false)}
            onMouseEnter={() => setIsHoveringCollapse(true)}
            onMouseLeave={() => setIsHoveringCollapse(false)}
          >
            {
              isHoveringCollapse === false ? 
              <img src={iconLeftWhite} alt="icon-left-white" /> :
              <img src={iconLeftRust} alt="icon-left-rust" />
            }
            
          </div> : null
        }

      </div>
      
    </div>
  )
}