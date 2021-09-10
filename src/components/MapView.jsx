import { NavHeader } from "./NavHeader"
import { useEffect, useRef, useState } from "react"
import { StripView } from "./StripView"
import { RoundedButton } from "./Buttons"
import { Map } from "./Map"
import { PhotoViewerModal } from "./PhotoViewerModal"
import * as d3 from 'd3'
import { Footer } from "./Footer"
import "../styles/MapView.scss"
import iconClose from "../assets/icons/icon-close.svg"
import iconCheck from "../assets/icons/icon-check.svg"

export const MapView = (props) => {

  // CONTROLS
  const [ distanceInterval, setDistanceInterval ] = useState(5)
  const [ addressRange, setAddressRange ]         = useState({})
  const [ mapSearchInput, setMapSearchInput ]     = useState("")
  const [ moveSpeed, setMoveSpeed ]               = useState("medium")
  const [ scrollAmount, setScrollAmount ]         = useState(0)
  const [ isMapMinimized, setIsMapMinimized ]     = useState(false)
  const [ directionFacing, setDirectionFacing ]   = useState("n")
  const [ yearsShowing, setYearsShowing ]         = useState({})
  const [ searchInput, setSearchInput ]           = useState("")

  // MODAL
  const [ isModalShowing, setIsModalShowing ] = useState(false)
  const [ modalImgUrl, setModalImgUrl ] = useState(null)
  const [ isSearchAndFilterShowing, setIsSearchAndFilterShowing ] = useState(false)

  const nearbyAddressesRange = [-2.5, 2.5]

  const moveSpeedOpts = {
    "slow"   : 0.2,
    "medium" : 0.8,
    "fast"   : 0.6
  }

  const addressContainer = useRef(null)
  const addressRef = useRef(null)

  
  // --------------------------------------------------------------------
  useEffect(() => {
    // console.log('allPhotoData', props.allPhotoData)
    // set all years to checked by default
    let years = {}
    for (let i = 0; i < props.dataFields.length; i++) {
      years[props.dataFields[i].year] = true
    }
    setYearsShowing(years)
  }, [])


  // --------------------------------------------------------------------
  // TODO: obviously not working now because we have boundaries to account
  // for and need to map
  // --------------------------------------------------------------------
  useEffect(() => {
    const svg = d3.select(addressRef.current)
      .attr("width", addressContainer.current.getBoundingClientRect().width)
      .attr("height", addressContainer.current.getBoundingClientRect().height)

    // clear out before we draw
    svg.selectAll("*").remove();

    // N addresses
    svg.append('g')
      .attr('class', 'addresses-text addresses-text-n')
      .selectAll('text')
      .data(props.addressesNData)
      .enter()
      .append('text')
      .attr("x", function(d) { 
				// index * 200 (mult)
				// return d.index * 200;
        return d.coord_min * 200 
			})
			.attr("y", "45")
			.attr("text-anchor", "middle")
			.text(function(d) { 
				return d.address 
			})
    
    // S addresses
    // svg.append('g')
    //   .attr('class', 'addresses-text addresses-text-s hidden-strip')
    //   .selectAll('text')
		// 	.data(props.addressesSData)
		// 	.enter()
		// 	.append('text')
		// 	.attr("x", function(d) { 
		// 		// return -d.index * 200; 
    //     return -d.coord_min * 200
		// 	})
		// 	.attr("y", "45")
		// 	.attr("text-anchor", "middle")
		// 	.text(function(d) { 
		// 		return d.address 
		// 	})

  }, [props.addressesNData, props.addressesSData])

  // --------------------------------------------------------------------
  // TODO: move to its own component
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
            onChange={ (e) => setSearchInput(e.target.value) } 
            placeholder="9041 Sunset Blvd."
            id="search-control-input"
          >
          </input>
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
  const renderMapControls = () => {
    return (
      <div className="map-controls">
        <div className="map-controls-inner">
          <div className="map-controls-left">
            <RoundedButton
              icon="icon-arrow-left" 
              label={'Head West'}
              handleOnClicked={() => console.log('Going West')}
            />
            <RoundedButton 
              label={`Direction: ${directionFacing.toUpperCase()}`}
              handleOnClicked={() => {
                if (directionFacing === 'n') {
                  setDirectionFacing('s')
                } else {
                  setDirectionFacing('n')
                }
              }}
            />
          </div>
          <div className="map-controls-right">
            <RoundedButton
              icon="icon-search-filter" 
              label={'Search & Filter'}
              handleOnClicked={() => {
                setIsSearchAndFilterShowing(true)
              }}
            />
            <RoundedButton
              icon="icon-arrow-right"  
              label={'Head East'}
              handleOnClicked={() => console.log('Going East')}
            />
          </div>
        </div>
        { renderSearchAndFilter() }
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
          <Map />
        <div 
          className="minimize-map-ctrl"
          onClick={ () => setIsMapMinimized(!isMapMinimized) }
        >
          {isMapMinimized ? "+" : "-"}
        </div>
      </div>
    )
  }

  // --------------------------------------------------------------------
  const renderStripViews = (direction) => {
    return props.dataFields.map((dataFieldObj) => {
      return (
        <StripView
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
        imgUrl={ modalImgUrl }
        handleShowModal={ () => setIsModalShowing(!isModalShowing) }
        isVisible={ isModalShowing }
      />
      <NavHeader />
      <div className="map-and-controls-container">
        { renderMap() }
        { renderMapControls() }
        {/* Address Bar */}
        <div ref={ addressContainer } className="strip-addresses">
          <svg
            ref={addressRef}
          />
        </div>
      </div>
      <div className={`strips-shade ${isMapMinimized ? "full" : ""} ${isSearchAndFilterShowing === true ? "visible" : ""}
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