import { useState, useEffect, React } from 'react';
import '../styles/App.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home'
import { StoriesView } from './StoriesView'
import { MapView } from './MapView'
import { Contact } from './Contact'
import { Team } from './Team'
import { About } from './About'

import { dataFields } from "../assets/data/dataFields"
import Config from "../config.json"
import axios from "axios"

export const App = () => {

  // DATA
  const [ addressesN, setAddressesN ]     = useState([])
  const [ addressesS, setAddressesS ]     = useState([])
  const [ allPhotoData, setAllPhotoData ] = useState([])

  const addressBoundariesTableId = "27379"
  const baseUrl = "https://api.baserow.io/api/database/rows/table/"
  const opts = {
    headers: {'Authorization': `Token ${Config.apiToken}`} 
  }

  let tempAllPhotoData = []
  let tempAddressesN   = []
  let tempAddressesS   = []

  // --------------------------------------------------------------------
  useEffect(() => {
    console.log('here')
    // get all address data
    loadAddressData(baseUrl + addressBoundariesTableId)

    const fetchAllPhotoData = async () => {
      const photoRequests = []
      // for (let i = 0; i < 1; i++) {
      for (let i = 0; i < dataFields.length; i++) {
        photoRequests.push(loadPhotoData(baseUrl + `${dataFields[i].tableId}`, dataFields[i]))
      }
      await Promise.all(photoRequests)
      setAllPhotoData(tempAllPhotoData)
    }
    
    // get all photo data
    // fetchAllPhotoData()
  }, [])

  
  // --------------------------------------------------------------------
  const loadAddressData = (url) => {
    axios.get(url, opts)
    .then((res) => {  
      if (res.status === 200) {
        // handle data
        res.data.results.forEach(row => {

          let processedRow = {
            "address": row.field_144140,
            "coord_min": row.field_144142,
            "coord_max": row.field_144143
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
  const loadPhotoData = (url, dataFieldObj, nPhotosArr, sPhotosArr) => {
    let tempPhotosN = nPhotosArr || []
    let tempPhotosS = sPhotosArr || []
  
    return axios.get(url, opts)
      .then((res) => {
        if (res.status === 200) {
          // handle data
          res.data.results.forEach(row => {

            let processedRow = {
              "identifier": row[dataFieldObj.idRow],
              "coordinate": row[dataFieldObj.coordRow],
            }

            if (row[dataFieldObj.ssRow] === "n" || row[dataFieldObj.ssRow] === "N") {
              tempPhotosN.push(processedRow)
            } else if (row[dataFieldObj.ssRow] === "s" || row[dataFieldObj.ssRow] === "S") {
              tempPhotosS.push(processedRow)
            }
          })

          // handle loading next page if url exists
          if (res.data.next) {
            let nextUrl = res.data.next.replace("http", "https")
            return loadPhotoData(nextUrl, dataFieldObj, tempPhotosN, tempPhotosS)
          } else {
            console.log(`finished for year ${dataFieldObj.year}`)
            
            let photoDataObj = {
              nPhotos: tempPhotosN,
              sPhotos: tempPhotosS
            }            

            tempAllPhotoData[dataFieldObj.year] = photoDataObj
            return photoDataObj
          }
        }
      })
      .catch((err) => {
        console.error('[loadPhotoData] error: ', err)
      })
  }

  // --------------------------------------------------------------------
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/about" component={ About }/>
          <Route path="/stories" component={ StoriesView }/>
          <Route 
            path="/panorama" 
            render={() => (
              <MapView
                addressesNData={ addressesN }
                addressesSData={ addressesS }
                dataFields={ dataFields } 
                allPhotoData={ allPhotoData } 
              />
            )}
          />
          <Route 
            path="/" 
            render={() => {
              return (
                <Redirect to="/panorama" />  
              )
            }}
          />
          <Route path="/contact" component = { Contact } />
          <Route path="/team" component={ Team } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;