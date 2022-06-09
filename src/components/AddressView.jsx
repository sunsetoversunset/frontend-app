import { useState, useEffect, React } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/App.scss'
import NavHeader from "./NavHeader"
import { PhotoViewerModal } from "./PhotoViewerModal.jsx" 
import { NavAddress } from "./NavAddress"
import { PhotoStripAddress } from "./PhotoStripAddress"
import "../styles/AddressView.scss"

import { CensusTable } from "./AddressDataTables/CensusTable"
import { OccupantsTable } from "./AddressDataTables/OccupantsTable"
import { NewspaperTable } from "./AddressDataTables/NewspaperTable"
import { OnlineBuildingRecords } from "./AddressDataTables/OnlineBuildingRecords"

import { dataFields } from "../assets/data/dataFields"
import Config from "../config.json"
import axios from "axios"

export const AddressView = (props) => {
	// address bounds states
	const [addressMin	, setAddressMin] = useState('')
	const [addressMax, setAddressMax]  = useState('')
	const [direction, setDirection]    = useState('')
	const [myKey, setMyKey]            = useState('')

	// all photo data states
	const [allPhotoData, setAllPhotoData]             = useState([])
	const [headerPhoto, setHeaderPhoto]               = useState('')
	const [organisedPhotoData, SetOrganisedPhotoData] = useState([])

	// modal states
	const [ modalImgUrl, setModalImgUrl ]       = useState(null)
	const [ isModalShowing, setIsModalShowing ] = useState(false)

	// API call consts
	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = { headers: {'Authorization': `Token ${Config.apiToken}`} }

	// global variables
	let tempAllPhotoData = []
	let params = useParams();
	const address = params.address

  useEffect( () => {
    // get the bounding address data and street side
    loadAddressData(boundUrl + `27379/?user_field_names=true&filter__field_144140__equal=${address}`)
  }, [params])

	// ---------------------------------------------------------------
	useEffect(() => {
    const fetchAllPhotoData = async () => {
      const photoRequests = []
      for (let i = 0; i < dataFields.length; i++) {
        photoRequests.push(loadPhotoData(boundUrl + `${dataFields[i].tableId}/?user_field_names=true&order_by=coordinate,-identifier`, dataFields[i]))
      }
      await Promise.all(photoRequests)
      setAllPhotoData(tempAllPhotoData)
    }
    fetchAllPhotoData()
  }, [])

	// ---------------------------------------------------------------
  const loadAddressData = (url) => {
		console.log('[AddressView] loadAddressData called.')
    axios.get(url, opts)
    .then((res) => {  
      if (res.status === 200) {
        // handle data
				if (res.data.results.length > 0) {
					let aData = res.data.results[0]
					setAddressMin(aData.coordinate_min)
					setAddressMax(aData.coordinate_max)
					setDirection(aData.street_side)
					setMyKey(aData.id)
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

  // --------------------------------------------------------------------
  const loadPhotoData = (url, dataFieldObj, tempPhotosArr) => {
    let tempPhotos = tempPhotosArr || []
  
    return axios.get(url, opts)
      .then((res) => {
        if (res.status === 200) {
          // handle data
          res.data.results.forEach(row => {

            let processedRow = {
              "identifier": row.identifier,
              "coordinate": row.coordinate,
              "street_side": row.street_side
            }
            tempPhotos.push(processedRow)
          })

          //handle loading next page if url exists
          if (res.data.next) {
            let nextUrl = res.data.next.replace("http", "https")
            return loadPhotoData(nextUrl, dataFieldObj, tempPhotos)
          } else {
            console.log(`finished for year ${dataFieldObj.year}`)  

            let photoDataObj = {
              year: dataFieldObj.year,
              photos: tempPhotos
            }                      

            tempAllPhotoData.push( photoDataObj)
            return photoDataObj
          }
        }
      })
      .catch((err) => {
        console.error(`[loadPhotoData for ${dataFieldObj.year}] error: `, err)
      })
  }

	// ---------------------------------------------------------------
	useEffect(() => {
		let updatedOrganisedPhotoData = []
		if (allPhotoData) {
			allPhotoData.forEach(first => {
				first.photos.forEach(row => {
					if (
						parseFloat(row.coordinate) < parseFloat(addressMax) && 
						parseFloat(row.coordinate) > parseFloat(addressMin) && 
						row.street_side === direction
					) {
						updatedOrganisedPhotoData.push({
							year: first.year,
							photoID: row.identifier
						})
					}
				})
			})
		}
		SetOrganisedPhotoData(updatedOrganisedPhotoData)
	}, [allPhotoData, direction, addressMax, addressMin])

	// ---------------------------------------------------------------
	useEffect(() => {
		if (organisedPhotoData.length >= 1) {
			setHeaderPhoto( organisedPhotoData[Math.round((organisedPhotoData.length - 1) / 2)].photoID )
		}
	}, [organisedPhotoData, headerPhoto])


	// ---------------------------------------------------------------
	const renderHeader = () => {
		return (
			<div 
				className="header-image" 
				style={ 
					headerPhoto ? 
					{ background: `url('https://media.getty.edu/iiif/image/${headerPhoto}/full/,1000/0/default.jpg')` } : 
					{ background: "white" }
				}
			>
				<p className="hero-address">{address} Sunset Boulevard</p>
			</div>
		)
	}

	// ---------------------------------------------------------------
	const renderMidNavigation = () => {
		return (
			<nav className="address-lower-nav">
				<NavAddress currentKey={myKey} address={address}/>
			</nav>
		)
	}

	// ---------------------------------------------------------------
	const renderPhotostripSection = () => {
		return (
			<div id="photographs" className="strip-container-wrap">
				<h1>Photographs</h1>
				<div className="photo-strip">
					{
						dataFields.map((dataFieldObj) => {
							return ( 
								<PhotoStripAddress
									handleSetModalImg={(img) => {
										setModalImgUrl(img) 
									}}
									handleShowModal={ () => setIsModalShowing(true) }
									key={`year-${dataFieldObj.year}`} 
									year={ dataFieldObj.year }
									photoData={organisedPhotoData}
								/>
							)
    				})
					}
				</div>
			</div>
		)
	}

	// ---------------------------------------------------------------
	// const renderStoriesSection = () => {
	// 	return (
	// 		<div id="stories" className="historical-profile-container container">
	// 			<h1>Stories</h1>
	// 		</div>
	// 	)
	// }

	// ---------------------------------------------------------------
	// const renderTagsSection = () => {
	// 	return (
	// 		<div id="tags" className="historical-profile-container container">
  //   		<h1>Tags</h1>
  //   	</div>
	// 	)
	// }

	// ---------------------------------------------------------------
	const renderHistoricalProfile = () => {
		return (
			<div id="historicalProfile" className="historical-profile-container container">
				<h1>Historical Profile</h1>
				<div className="census">
					<CensusTable address={address}/>
					<OccupantsTable address={address}/>
					<NewspaperTable address={address} />
					<OnlineBuildingRecords />
				</div>
			</div>
		)
	}

  // ---------------------------------------------------------------
  return (
  	<div className="app-page" id="address-page">
      <NavHeader />
       <PhotoViewerModal 
        nearbyAddresses={ [] } 
        imgObj={ modalImgUrl }
        handleHideModal={ () => setIsModalShowing(false) }
        isVisible={ isModalShowing } 
      /> 
  		{ renderHeader() }	
      { renderMidNavigation() }
      { renderPhotostripSection() }
      {/* renderStoriesSection() */}
    	{/* renderTagsSection() */}
			{ renderHistoricalProfile() }
    </div>
	)
}