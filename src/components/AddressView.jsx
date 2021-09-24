import { useState, useEffect, React } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/App.scss'
import { NavHeader } from "./NavHeader"
import { PhotoViewerModal } from "./PhotoViewerModal" 
import { NavAddress } from "./NavAddress"
import { PhotoStripAddress } from "./PhotoStripAddress"
import { Footer } from "./Footer"
import "../styles/AddressView.scss"

import { dataFields } from "../assets/data/dataFields"
import Config from "../config.json"
import axios from "axios"

export const AddressView = (props) => {
	//address bounds states
	const [addressMin	, setAddressMin] = useState('')
	const [addressMax, setAddressMax] = useState('')
	const [direction, setDirection] = useState('')
	const [myKey, setMyKey] = useState('')

	//all photo data
	const [allPhotoData, setAllPhotoData] = useState([])
	const [headerPhoto, setHeaderPhoto] = useState('')
	const [organisedPhotoData, SetOrganisedPhotoData] = useState([])

	//modal
	const [ modalImgUrl, setModalImgUrl ] = useState(null)
	const [ isModalShowing, setIsModalShowing ] = useState(false)

	//getting the address boundires
	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = {
  headers: {'Authorization': `Token ${Config.apiToken}`} 
	}

	let tempAllPhotoData = []
	let params = useParams();
	const address = params.address


	// ---------------------------------------------------------------
	useEffect(() => {
    // get the bounding address data and street side
    loadAddressData(boundUrl + `27379/?user_field_names=true&filter__field_144140__equal=${address}`)
    
  // ---------------------------------------------------------------
    const fetchAllPhotoData = async () => {
      const photoRequests = []
      for (let i = 0; i < 1; i++) {
       //for (let i = 0; i < dataFields.length; i++) {
        photoRequests.push(loadPhotoData(boundUrl + `${dataFields[i].tableId}?user_field_names=true`, dataFields[i]))
      }
      await Promise.all(photoRequests)
      setAllPhotoData(tempAllPhotoData)

    }
    //get all the photo data
    fetchAllPhotoData()

  }, [])

	// ---------------------------------------------------------------
  const loadAddressData = (url) => {
    axios.get(url, opts)
    .then((res) => {  
      if (res.status === 200) {
        // handle data
        res.data.results.map( res => {
	        setAddressMin(res.coordinate_min)
	       	setAddressMax(res.coordinate_max)
	       	setDirection(res.street_side)
	       	setMyKey(res.id)
        })
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
        console.error('[loadPhotoData] error: ', err)
      })
  }


	// ---------------------------------------------------------------
	  useEffect(() => {
	  	let organisedPhotoData = []
	  		if(allPhotoData){
	  			allPhotoData.forEach( first => {
	  				first.photos.forEach( row => {
	  					if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin) && row.street_side === direction){
	  						organisedPhotoData.push({
	  							year: first.year,
	  							photoID: row.identifier
	  							})
	  					}
	  				})
	  			})
	  		}
			SetOrganisedPhotoData(organisedPhotoData)
	   }, [allPhotoData, direction, addressMax, addressMin])

	// ---------------------------------------------------------------
		useEffect(() => {
			if(organisedPhotoData.length >= 1){
				setHeaderPhoto( organisedPhotoData[Math.round((organisedPhotoData.length - 1) / 2)].photoID )
				}
		}, [organisedPhotoData, headerPhoto])


  // ---------------------------------------------------------------
  return(
  	<div className="app-page" id="contact">
      <NavHeader />
      <PhotoViewerModal 
        imgUrl={ modalImgUrl }
        isVisible={ isModalShowing }
        handleHideModal={ () => setIsModalShowing(false) }
      />
  		{/* header image */}
      	<div className="header-image" style={{backgroundImage: `url('https://media.getty.edu/iiif/image/${headerPhoto}/full/,1000/0/default.jpg')`}}>
      		<p className="hero-address">{address} Sunset Boulevard</p>
      	</div>
      {/* mid navn */}
      	<nav className="address-lower-nav">
      			<NavAddress currentKey={myKey}/>
      	</nav>

      	{/* photo srtip section */}
      	<div id="Photographs" className="strip-container-wrap">
      		<h1>Photographs</h1>
      		<div className="photo-strip">
	      		{dataFields.map((dataFieldObj, key) => {
      			return ( 
			        <PhotoStripAddress
			          handleSetModalImg={ (img) => {
			            setModalImgUrl(img) 
			          }}
			          handleShowModal={ () => setIsModalShowing(true) }
			          key={`year-${dataFieldObj.year}`} 
			          year={ dataFieldObj.year }
			          photoData={organisedPhotoData}
			        />
      )
    })}
      		</div>
      	</div>

	    {/*  ALLL THE DATA section */}
      	<div id="HistoricalProfile" className="historical-profile-container ">
      		Historical Profiles
      	</div>
    
      <Footer />
    </div>
  	)

}