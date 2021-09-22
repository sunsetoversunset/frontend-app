import { NavHeader } from "./NavHeader"
import { useEffect, useState } from "react"
import { PhotoStrip } from "./PhotoStrip"
import { Map } from "./Map"
import { PhotoViewerModal } from "./PhotoViewerModal" 
import { AddressBar } from "./AddressBar"
import { Footer } from "./Footer"
import "../styles/MapView.scss"

import iconClose from "../assets/icons/icon-close.svg"
import iconCheck from "../assets/icons/icon-check.svg"
import iconMinimize from "../assets/icons/icon-minimize.svg"
import iconMaximize from "../assets/icons/icon-maximize.svg"

export const MapView = (props) => {

  // CONTROLS
  const [ zoomRange, setZoomRange ]             = useState([])
  const [ mappedZoomRange, setMappedZoomRange ] = useState([])
  const [ moveSpeed, setMoveSpeed ]             = useState("medium")
  const [ scrollAmount, setScrollAmount ]       = useState(0)
  const [ isMapMinimized, setIsMapMinimized ]   = useState(false)
  const [ directionFacing, setDirectionFacing ] = useState("n")
  const [ yearsShowing, setYearsShowing ]       = useState({})
  const [ searchInput, setSearchInput ]         = useState("")
  const [ searchResults, setSearchResults ]     = useState([])
  const [ allAddresses, setAllAddresses ]       = useState([])
  const [ nearbyAddresses, setNearbyAddresses ] = useState([])

  // hard-coding this for now but coords will change
  const coordRange = [-118.56112, -118.2249107]
  
  const moveSpeedOpts = {
    "slow"   : 0.2,
    "medium" : 0.8,
    "fast"   : 0.6
  }

  // ADDRESSES
  const [ filteredAddressesN, setFilteredAddressesN ] = useState([])
  const [ filteredAddressesS, setFilteredAddressesS ] = useState([])
  const nearbyAddressesRange = [-2.5, 2.5]

  // MODAL
  const [ isModalShowing, setIsModalShowing ] = useState(false)
  const [ modalImgUrl, setModalImgUrl ] = useState(null)
  const [ isSearchAndFilterShowing, setIsSearchAndFilterShowing ] = useState(false)
  
  // --------------------------------------------------------------------
  // Get new addresses anytime we click a photo in a strip
  useEffect(() => {
    console.log('here')
    setNearbyAddresses(['123 Sunset Blvd.', '1234 Sunset Blvd.', '12345 Sunset Blvd.'])
  }, [modalImgUrl])

  // --------------------------------------------------------------------
  useEffect(() => {
    // set all years to checked by default
    let years = {}
    for (let i = 0; i < props.dataFields.length; i++) {
      years[props.dataFields[i].year] = true
    }
    setYearsShowing(years)
  }, [])

  // --------------------------------------------------------------------
  useEffect(() => {
    setAllAddresses(props.addressesNData.concat(props.addressesSData))
  }, [props.addressesSData, props.addressesNData])

  // --------------------------------------------------------------------
  const mapRange = (value, low1, high1, low2, high2) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  // --------------------------------------------------------------------
  useEffect(() => {
    let lBounds = mapRange(zoomRange[0], coordRange[0], coordRange[1], 0, 1000)
    let rBounds = mapRange(zoomRange[1], coordRange[0], coordRange[1], 0, 1000)
    setMappedZoomRange([lBounds, rBounds])
    console.log('zoomRange: ', zoomRange)
    console.log('mappedZoomRange: ', [lBounds, rBounds])

    filterAddressesByRange([lBounds, rBounds])
  }, [zoomRange])

  
  // --------------------------------------------------------------------
  const filterAddressesByRange = (zRange) => {
    // let's filter both N & S
    let filteredN = props.addressesNData.filter(address => {
      let parsedMin = parseFloat(address.coord_min)
      let parsedMax = parseFloat(address.coord_max)
      return parsedMin >= zRange[0] && parsedMax <= zRange[1]
    })

    let filteredS = props.addressesSData.filter(address => {
      let parsedMin = parseFloat(address.coord_min)
      let parsedMax = parseFloat(address.coord_max)
      return parsedMin >= zRange[0] && parsedMax <= zRange[1]
    })

    setFilteredAddressesN(filteredN)
    setFilteredAddressesS(filteredS)
  }

  // --------------------------------------------------------------------
  // Filter photo data whenever we brush the map
  useEffect(() => {
    if (directionFacing === 'n') {
      console.log('filtered addresses N:', filteredAddressesN.length)
    } else {
      console.log('filtered addresses S: ', filteredAddressesS.length)
    }
  }, [filteredAddressesN, filteredAddressesS])


  // --------------------------------------------------------------------
  // TODO: move to its own component
  // --------------------------------------------------------------------
  const handleSearch = (searchTerm) => {
    setSearchInput(searchTerm)
    let results = allAddresses.filter((addressObj) => {
      return searchTerm.includes(addressObj.address) || addressObj.address.includes(searchTerm)
    })

    // Return the first 8
    setSearchResults(results.slice(0, 7))
  }

  // --------------------------------------------------------------------
  const renderSearchResults = () => {
    return (
      <ul className='search-results-list'>
        {
          searchResults.map((result, idx) => {
            return (
              <li key={`result-${idx}`}>
                <div 
                  className="result-list-item"
                  onClick={() => console.log('handle setting address', result.address)}
                >
                  {result.address} Sunset Blvd.
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  // --------------------------------------------------------------------
  const renderSearchAndFilter = () => {
    return (
      <div className={`search-and-filter-opts 
        ${isSearchAndFilterShowing ? "visible" : ""}
      `}>
        <div 
          className="icon-close-search-container"
          onClick={() => setIsSearchAndFilterShowing(false)}
        >
          <img src={iconClose} alt="icon-close-search" />
        </div>
        <div className='search-control'>
          <label 
            className="control-label" 
            htmlFor="search-control-input">
              Search an address
            </label>
          <input
            type="text"
            value={ searchInput }
            onChange={ (e) => handleSearch(e.target.value) } 
            placeholder="9041 Sunset Blvd."
            id="search-control-input"
          >
          </input>
        </div>
        <div className='search-results-outer'>
          <div className={`search-results-inner ${ searchInput.length === 0 || searchResults.length === 0 ? 'hidden' : 'visible'}`}>
            { renderSearchResults() }
          </div>
        </div>
        <div className="divider"></div>
        { renderYearsControls() }
      </div>
    )
  }

  // --------------------------------------------------------------------
  const renderYearsControls = () => {
    return (
      <div className="years-control">
        <label className="control-label">Display years</label>
        { props.dataFields.map(dataField => {
          return (
            <div
              key={`check-${dataField.year}`} 
              className={`year-control ${yearsShowing[dataField.year] ? 'checked' : ''}`}
              onClick={() => {
                let currentYearsShowing = {...yearsShowing}
                currentYearsShowing[dataField.year] = !currentYearsShowing[dataField.year]
                setYearsShowing(currentYearsShowing)
              }}
            >
              <input 
                checked={yearsShowing[dataField.year]}
                id={`year-${dataField.year}`}
                className="year-checkbox"
                name={`year-${dataField.year}`}
                type="checkbox" 
              />
              {
                yearsShowing[dataField.year] === true ?
                <img 
                  className='icon-year-checked'
                  src={iconCheck} 
                  alt="icon-year-checked" 
                /> : null
              }
              <label
                onClick={(e) => {
                  e.preventDefault()
                  let currentYearsShowing = {...yearsShowing}
                  currentYearsShowing[dataField.year] = !currentYearsShowing[dataField.year]
                  setYearsShowing(currentYearsShowing)
                }} 
                className="year-label" 
                htmlFor={`year-${dataField.year}`}
              >
                {dataField.year}
              </label>
            </div>
          )
        }) }
      </div>
    )
  }

  // --------------------------------------------------------------------
  const renderMap = () => {
    return (
      <div 
        className={`map-container 
          ${isMapMinimized? 'minimized' : 'maximized'}
        `}>
          <Map
            isMapMinimized={ isMapMinimized }
            setIsMapMinimized={ setIsMapMinimized }
            directionFacing={ directionFacing }
            setDirectionFacing={ setDirectionFacing }
            zoomRange={ zoomRange }
            moveSpeed={ moveSpeed }
            setZoomRange={ setZoomRange }
            renderSearchAndFilter={renderSearchAndFilter}
            setIsSearchAndFilterShowing={setIsSearchAndFilterShowing}
          />
        <div
          role="button" 
          className={`minimize-map-ctrl ${isMapMinimized === false ? 'visible' : 'hidden'}`}
          onClick={ () => setIsMapMinimized(!isMapMinimized) }
        >
          {isMapMinimized ? 
            <img src={iconMaximize} alt="icon-maximize"/> : 
            <img src={iconMinimize} alt="icon-minimize"/>
          }
        </div>
      </div>
    )
  }

  // --------------------------------------------------------------------
  const renderStripViews = (direction) => {
    return props.dataFields.map((dataFieldObj) => {
      return (
        <PhotoStrip
          isVisible={yearsShowing[dataFieldObj.year]}
          handleSetModalImg={ (img) => {
            setModalImgUrl(img) 
          }}
          handleShowModal={ () => setIsModalShowing(true) }
          photoData={ 
            props.allPhotoData[dataFieldObj.year] ? 
            props.allPhotoData[dataFieldObj.year] : null 
          }
          key={`year-${dataFieldObj.year}`} 
          direction={ direction }
          year={ dataFieldObj.year }
          scrollAmount={scrollAmount}
        />
      )
    })
  }

  // --------------------------------------------------------------------
  return (
    <div className="app-page">
      <PhotoViewerModal
        nearbyAddresses={ nearbyAddresses } 
        imgUrl={ modalImgUrl }
        handleHideModal={ () => setIsModalShowing(false) }
        isVisible={ isModalShowing }
      />
      <NavHeader />
      <div className="map-and-controls-container">
        { renderMap() }
        <AddressBar
          scrollAmount={ scrollAmount } 
          directionFacing={ directionFacing }
          addressesNData={ props.addressesNData }
          addressesSData={ props.addressesSData }
        />
      </div>
      <div
        onClick={() => setIsSearchAndFilterShowing(false)} 
        className={`strips-shade ${isMapMinimized ? "full" : ""} ${isSearchAndFilterShowing === true ? "visible" : ""}
      `}></div>
      <div className={`strips-container ${isSearchAndFilterShowing === true ? "noscroll" : ""} ${isMapMinimized ? "full" : ""} is-showing-${directionFacing}
      `}>
        { 
          directionFacing === "n" ? 
          renderStripViews('n') : renderStripViews('s')
        }
        <Footer />
      </div>
    </div>
  )
} 

export default MapView