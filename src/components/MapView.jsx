import { NavHeader } from "./NavHeader"
import { useEffect, useState } from "react"
import { PhotoStrip } from "./PhotoStrip"
import { Map } from "./Map"
import { PhotoViewerModal } from "./PhotoViewerModal" 
import { AddressBar } from "./AddressBar"
import { Footer } from "./Footer"
import "../styles/MapView.scss"

import { tableFields as tf } from "../assets/data/tableFields"
import Config from "../config.json"
import axios from "axios"

import iconMinimize from "../assets/icons/icon-minimize.svg"
import iconMaximize from "../assets/icons/icon-maximize.svg"

export const MapView = () => {

  // ---------------------------------------------------------------
  // DATA
  const [ addressesN, setAddressesN ] = useState([])
  const [ addressesS, setAddressesS ] = useState([])
  let   tempAddressesN                = []
  let   tempAddressesS                = []

  const baseUrl = "https://api.baserow.io/api/database/rows/table/"
  const opts = {
    headers: {'Authorization': `Token ${Config.apiToken}`} 
  }


  // ---------------------------------------------------------------
  // CONTROLS
  const moveSpeedOpts = {
    "slow"   : 0.2,
    "medium" : 0.8,
    "fast"   : 0.6
  }

  const mult = 200

  const [ zoomRange, setZoomRange ]             = useState([])
  const [ mappedZoomRange, setMappedZoomRange ] = useState([])
  const [ moveSpeed, setMoveSpeed ]             = useState(moveSpeedOpts.medium)
  const [ scrollAmount, setScrollAmount ]       = useState(0)
  const [ isMapMinimized, setIsMapMinimized ]   = useState(false)
  const [ directionFacing, setDirectionFacing ] = useState("n")
  const [ yearsShowing, setYearsShowing ]       = useState({})
  const [ allAddresses, setAllAddresses ]       = useState([])
  const [ nearbyAddresses, setNearbyAddresses ] = useState([])
  const [ isSearchAndFilterShowing, setIsSearchAndFilterShowing ] = useState(false)
    
  // ---------------------------------------------------------------
  // ADDRESSES
  // hard-coding this for now but coords will change
  const nearbyAddressesRange = [-2.5, 2.5]
  const coordRange           = [-118.39253, -118.36673]
  const [ filteredAddressesN, setFilteredAddressesN ] = useState([])
  const [ filteredAddressesS, setFilteredAddressesS ] = useState([])

  // MODAL
  const [ isModalShowing, setIsModalShowing ] = useState(false)
  const [ modalImg, setModalImg ] = useState(null)
 
  // ---------------------------------------------------------------
  // Get nearby addresses anytime we click a photo in a strip
  useEffect(() => {
    if (modalImg === null) return
    const fetchNearbyAddresses = async () => {
      const data = await getNearbyAddresses(modalImg)
      setNearbyAddresses(data)
    }
    fetchNearbyAddresses()
  }, [modalImg])
  

  // ---------------------------------------------------------------
  useEffect(() => {
    // set all years to checked by default
    let years = {}
    for (let i = 0; i < tf.photoData.length; i++) {
      years[tf.photoData[i].year] = true
    }
    setYearsShowing(years)
    loadAddressData(baseUrl + tf.addressBoundaries.tableId)
  }, [])
  

  // ---------------------------------------------------------------
  useEffect(() => {
    if (zoomRange.length > 0) {
      let lBounds = mapRange(zoomRange[0], coordRange[0], coordRange[1], 0, 1000)
      let rBounds = mapRange(zoomRange[1], coordRange[0], coordRange[1], 0, 1000)
      setMappedZoomRange([lBounds, rBounds])
      console.log('L: ', lBounds, 'R: ', rBounds)
      filterAddressesByRange([lBounds, rBounds])
    }
  }, [zoomRange])


  // ---------------------------------------------------------------
  // useEffect(() => {
  //   if (directionFacing === 'n') {
  //     console.log('[filteredAddressesN]:', filteredAddressesN)
  //   } else {
  //     console.log('[filteredAddressesS]:', filteredAddressesS)
  //   }
  // }, [filteredAddressesN, filteredAddressesS])


  // ---------------------------------------------------------------
  useEffect(() => {
    const handleSetMoveSpeed = (e) => {
      if (e.key === 1 || e.key === 2 || e.key === 3) {
        if (e.key === 1) {
          setMoveSpeed(moveSpeedOpts.slow)
        } else if (e.key === 2) {
          setMoveSpeed(moveSpeedOpts.medium)
        } else if (e.key === 3) {
          setMoveSpeed(moveSpeedOpts.fast)
        }
      }
    }

    document.addEventListener('keydown', handleSetMoveSpeed)
    return () => document.removeEventListener("keydown", handleSetMoveSpeed)
  })


  // ---------------------------------------------------------------
  const loadAddressData = (url) => {
    axios.get(url, opts)
    .then((res) => {  
      if (res.status === 200) {
        // handle data
        res.data.results.forEach(row => {
          let processedRow = {
            "address": row[tf.addressBoundaries.address],
            "coord_min": row[tf.addressBoundaries.coordMin],
            "coord_max": row[tf.addressBoundaries.coordMax]
          }
          
          if (row.field_144141 === "n" || row.field_144141 === "N") {
            tempAddressesN.push(processedRow)
          } else if (row.field_144141 === "s" || row.field_144141 === "S") {
            tempAddressesS.push(processedRow)
          }
        })
        
        // handle loading next page if url exists
        if (res.data.next) {
          let nextUrl = res.data.next.replace("http", "https")
          loadAddressData(nextUrl)
        } else {
          // no more next, store in state
          console.log('[loadAddressData] done getting addresses.')
          setAddressesN(tempAddressesN)
          setAddressesS(tempAddressesS)
          setAllAddresses(tempAddressesN.concat(tempAddressesS))
        }
      } else {
        // Handle case where baserow throws an error
        console.error('Got baserow error status: ', res.status)
        if (res.statusText !== "") {
          console.log('Got baserow statusText: ', res.statusText)
        }
      }
    })
    .catch((err) => {
      console.log('err: ', err)
    })
  }
  

  // ---------------------------------------------------------------
  // When you select an address from the search results
  const handleCenterAddress = (address) => {
    console.log('[handleCenterAddress] address: ', address)
    setIsSearchAndFilterShowing(false)
  }


  // ---------------------------------------------------------------
  const getNearbyAddresses = async (imgObj) => {
    let coord = parseFloat(await getPhotoCoord(imgObj))

    // eliminate addresses outside the nearbyAddressesRange
    let nearbyAddressObjs = allAddresses.filter(address => {
      let addMin = parseFloat(address.coord_min)
      let addMax = parseFloat(address.coord_max)
      return (
        // address min has to be between coord - 2.5 and coord 
        (addMin >= coord - nearbyAddressesRange[0] && addMin <= coord) ||
        // address max has to be between coord and coord + 2.5
        (addMax >= coord && addMax <= coord + nearbyAddressesRange[1])
      )
    })

    // sort by closest to furthest + return first 4
    nearbyAddressObjs.sort((aObjA, aObjB) => {
      return aObjA.address - aObjB.address
    })

    if (nearbyAddressObjs.length > 4) {
      nearbyAddressObjs = nearbyAddressObjs.slice(0, 4)
    }

    return nearbyAddressObjs.map((aObj) => {
      return aObj.address
    })
  }


  // ---------------------------------------------------------------
  const getPhotoCoord = async (imgObj) => {

    let idx = tf.photoData.findIndex(df => {
      return df.year === imgObj.year
    })
    
    const queryURL = `${baseUrl}${tf.photoData[idx].tableId}/?filter__${tf.photoData[idx].idRow}__equal=${imgObj.id}`

    return axios.get(queryURL, opts)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.results.length === 1) {
            return res.data.results[0][tf.photoData[idx].coordRow]
          }
          // We shouldn't hit this case 
          return null
        }
      }).catch((err) => {
        // TODO: Is this a case where we want to show a modal to the user?
        console.log('err: ', err)
        return null
      })
  }


  // ---------------------------------------------------------------
  const mapRange = (value, low1, high1, low2, high2) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }


  // ---------------------------------------------------------------
  const filterAddressesByRange = (zRange) => {
    // let's filter both N & S
    let filteredN = addressesN.filter(address => {
      let parsedMin = parseFloat(address.coord_min)
      let parsedMax = parseFloat(address.coord_max)
      return parsedMin >= zRange[0] && parsedMax <= zRange[1]
    })

    let filteredS = addressesS.filter(address => {
      let parsedMin = parseFloat(address.coord_min)
      let parsedMax = parseFloat(address.coord_max)
      return parsedMin >= zRange[0] && parsedMax <= zRange[1]
    })

    setFilteredAddressesN(filteredN)
    setFilteredAddressesS(filteredS)
  }

  // ---------------------------------------------------------------
  const renderMap = () => {
    return (
      <div 
        className={`map-container 
          ${isMapMinimized? 'minimized' : 'maximized'}
        `}>
          <Map
            scrollAmount={ scrollAmount }
            setScrollAmount={ setScrollAmount }
            allAddresses={ allAddresses }
            isMapMinimized={ isMapMinimized }
            setIsMapMinimized={ setIsMapMinimized }
            directionFacing={ directionFacing }
            setDirectionFacing={ setDirectionFacing }
            zoomRange={ zoomRange }
            moveSpeed={ moveSpeed }
            setZoomRange={ setZoomRange }
            isSearchAndFilterShowing={ isSearchAndFilterShowing }
            setIsSearchAndFilterShowing={ setIsSearchAndFilterShowing }
            yearsShowing={ yearsShowing }
            setYearsShowing={ setYearsShowing }
            handleCenterAddress={ handleCenterAddress }
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


  // ---------------------------------------------------------------
  const renderStripViews = (direction) => {
    return tf.photoData.map((dataFieldObj) => {
      return (
        <PhotoStrip
          mult={ mult }
          meta={ dataFieldObj }
          mappedZoomRange={ mappedZoomRange }
          directionFacing={ directionFacing }
          stripDirection={ direction }
          isVisible={
            yearsShowing[dataFieldObj.year] && 
            direction === directionFacing
          }
          handleSetModalImg={ (imgObj) => { setModalImg(imgObj) }}
          handleShowModal={ () => setIsModalShowing(true) }
          key={`year-${ dataFieldObj.year }`} 
          scrollAmount={ scrollAmount }
        />
      )
    })
  }


  // ---------------------------------------------------------------
  return (
    <div className="app-page">
      <PhotoViewerModal
        nearbyAddresses={ nearbyAddresses } 
        imgObj={ modalImg }
        handleHideModal={ () => setIsModalShowing(false) }
        isVisible={ isModalShowing }
      />
      <NavHeader />
      <div className="map-and-controls-container">
        { renderMap() }
        <AddressBar
          mult={ mult }
          scrollAmount={ scrollAmount } 
          directionFacing={ directionFacing }
          filteredAddressesN={ filteredAddressesN }
          filteredAddressesS={ filteredAddressesS }
          addressesNData={ addressesN }
          addressesSData={ addressesS }
        />
      </div>
      <div
        onClick={() => setIsSearchAndFilterShowing(false)} 
        className={
          `strips-shade ${isMapMinimized ? "full" : "minimized"} ${isSearchAndFilterShowing === true ? "visible" : "hidden"}`}>
      </div>
      <div className={`strips-container ${isSearchAndFilterShowing === true ? "noscroll" : "scroll"} ${isMapMinimized ? "full" : "minimized"} is-showing-${directionFacing}`}>
        { renderStripViews('n') }
        { renderStripViews('s') }
        <Footer />
      </div>
    </div>
  )
} 

export default MapView