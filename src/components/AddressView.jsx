import { useState, useEffect, React } from 'react'
import {useHistory} from 'react-router-dom'
import '../styles/App.scss'
import { NavHeader } from "./NavHeader"
import { RoundedButton } from "./Buttons"
import { PhotoViewerModal } from "./PhotoViewerModal" 
import { NavAddress } from "./NavAddress"
import { MapView } from './MapView'
import { PhotoStripAddress } from "./PhotoStripAddress"
import { Footer } from "./Footer"
import "../styles/AddressView.scss"

import { dataFields } from "../assets/data/dataFields"
import Config from "../config.json"
import axios from "axios"

const address = window.location.pathname.replace("/address/", "").replace("/", "")
let addressss = []
let addressMax = ''

export const AddressView = (props) => {

	const [fullAddress, setFullAddress] = useState('')
	const [addressMin, setAddressMin] = useState('')
	const [addressMax, setAddressMax] = useState('')
	const [direction, setDirection] = useState('')
	const [myKey, setMyKey] = useState('')
	const [prevAddress, setPrevAddress] = useState('')
	const [nextAddress, setNextAddress] = useState('')
	const [headerPhoto, setHeaderPhoto] = useState('')
	const [addressPhotoData, setAddressPhotoData] = useState([])

	//modal
  	const [ modalImgUrl, setModalImgUrl ] = useState(null)
  	const [ isModalShowing, setIsModalShowing ] = useState(false)

  	//uri
	const baseUrl = "https://api.baserow.io/api/database/rows/table/27759"
  	const opts = {
    headers: {'Authorization': `Token ${Config.apiToken}`} 
  	}

	// useEffect(() => {
 //    // get all address data
 //    loadAddressData(baseUrl)

 //  }, [])

	// useEffect(() => {
	// 	if(dataSoFar.length > 1){
	// 	dataSoFar.map( (setting, key) => {
	// 		//console.log(setting.field_146422)
	// 	})
	// 	}
	// }, [dataSoFar])
	// useEffect(() => {
	// 	if(window.localStorage.getItem(fullAddress)){
	// 		setFullAddress(window.localStorage.getItem(fullAddress))
	// 	}else{
	// 		setFullAddress(props.fullAddresses)
	// 	}
	// })

	// useEffect(() => {
	// 	props.fullAddresses.forEach( (row, key) => {
	// 		if(row.address === address){
	// 			setMyKey(key)
	// 			setAddressMin(row.coord_min)
	// 			setAddressMax(row.coord_max)
	// 			setDirection(row.street_side)
	// 		}
	// 	})
		
	// }, [props.fullAddresses])

	// ---------------------------------------------------------------
	  // useEffect(() => {
	  // if(props.allPhotoData){
	  // 	if(direction === 'n' || direction === 'N'){
	  // 		if(props.allPhotoData._1973){
			//   		props.allPhotoData._1973.nPhotos.forEach( row => {
			// 	     if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin)){
			// 	       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
			// 	     }
			// 	   })
		 // 		}else if(props.allPhotoData._1985){
		 // 			props.allPhotoData._1973.nPhotos.forEach( row => {
			// 	     if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin)){
			// 	       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
			// 	     }
			// 	   })
		 // 		}else if(props.allPhotoData._1966){
		 // 				props.allPhotoData._1966.nPhotos.forEach( row => {
			// 	     if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin)){
			// 	       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
			// 	     }
			// 	   })
		 // 		}
	  // 	}

	  // 	if(direction === 's' || direction === 'S'){
	  // 		if(props.allPhotoData._1973){
			//   		props.allPhotoData._1973.nPhotos.forEach( row => {
			// 	     if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin)){
			// 	       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
			// 	     }
			// 	   })
		 // 		}else if(props.allPhotoData._1985){
		 // 				props.allPhotoData._1985.nPhotos.forEach( row => {
			// 	     if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin)){
			// 	       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
			// 	     }
			// 	   })
		 // 		}else if(props.allPhotoData._1966){
		 // 				props.allPhotoData._1966.nPhotos.forEach( row => {
			// 	     if(parseFloat(row.coordinate) < parseFloat(addressMax) && parseFloat(row.coordinate) > parseFloat(addressMin)){
			// 	       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
			// 	     }
			// 	   })
		 // 		}
	  // 	}
	  // }
	  // }, [props.allPhotoData, direction, addressMax, addressMin])

	// ---------------------------------------------------------------
		// useEffect(() => {
		// 	setHeaderPhoto( addressPhotoData[Math.round((addressPhotoData.length - 1) / 2)] )
		// }, [addressPhotoData, headerPhoto])

	// ---------------------------------------------------------------
		// useEffect(() => {
		// 	if(props.fullAddresses[myKey-1]){
		// 		setPrevAddress(
		// 			props.fullAddresses[myKey-1].address
		// 			)
		// 	}
		// }, [props.fullAddresses, myKey])

		// useEffect(() => {
		// 	if(props.fullAddresses[myKey-1]){
		// 		setNextAddress(
		// 			props.fullAddresses[myKey+1].address
		// 			)
		// 	}
		// }, [props.fullAddresses, myKey])


	// const loadAddressData = (url) => {
 //    axios.get(url, opts)
 //    .then((res) => {  
 //      if (res.status === 200) {
 //        // handle data
 //       	res.data.results.map( (table, key) => {
 //       		addressss.push(table)
 //       	})

 //       	// handle loading next page if url exists
 //        if (res.data.next) {
 //          let nextUrl = res.data.next.replace("http", "https")
 //          loadAddressData(nextUrl)
 //        } else {
 //          // no more next, store in state
 //          console.log('We have reached the end of the line')
 //          setDataSoFar(addressss)
 //        }
        
        
 //      } else {
 //        // Handle case where baserow throws an error
 //        console.error('Got baserow error status: ', res.status)
 //        if (res.statusText !== "") {
 //          console.log('Got baserow statusText: ', res.statusText)
 //        }
 //      }
 //    })
 //    .catch((err) => {
 //      console.log('err: ', err)
 //    })
 //  } 

  const handleScroll = (dir) => {
  	
  }
  

  // ---------------------------------------------------------------
  return(
  	<div className="app-page" id="contact">
      <NavHeader />
      <PhotoViewerModal 
        imgUrl={ modalImgUrl }
        handleShowModal={ () => setIsModalShowing(!isModalShowing) }
        isVisible={ isModalShowing }
      />
  		{/* header image */}
      	<div className="header-image" style={{backgroundImage: `url('https://media.getty.edu/iiif/image/${headerPhoto}/full/,1000/0/default.jpg')`}}>
      		<p className="hero-address">{address} Sunset Boulevard</p>
      	</div>
      {/* mid navn */}
      	{/*<nav className="address-lower-nav">
      		<RoundedButton
              icon="icon-arrow-left" 
              label={`${prevAddress} Sunset Blvd.`}
              handleOnClicked={() => handleScroll(prevAddress)}
            />
      			<NavAddress />
      		<RoundedButton
              icon="icon-arrow-right" 
              label={`${nextAddress} Sunset Blvd.`}
              handleOnClicked={() => handleScroll(nextAddress)}
            />
      	</nav>*/}

      	{/* photo srtip section */}
      	<div id="Photographs" className="strip-container-wrap">
      		<h1>Photographs</h1>
      		<div className="photo-strip">
	      		{/*{props.dataFields.map((dataFieldObj) => {
      			return (
			        <PhotoStripAddress
			          isVisible={true}
			          handleSetModalImg={ (img) => {
			            setModalImgUrl(img) 
			          }}
			          handleShowModal={ () => setIsModalShowing(true) }
			          photoData={ 
            			props.allPhotoData[`_${dataFieldObj.year}`] ? 
            			props.allPhotoData[`_${dataFieldObj.year}`] : null  
			          }
			          key={`year-${dataFieldObj.year}`} 
			          min={addressMin}
			          max={addressMax}
			          year={ dataFieldObj.year }
			        />
      )
    })}*/}
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