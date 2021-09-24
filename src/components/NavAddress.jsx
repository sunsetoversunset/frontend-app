import { useState, useEffect} from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { RoundedButton } from "./Buttons"
import '../styles/NavHeader.scss';

import { dataFields } from "../assets/data/dataFields"
import Config from "../config.json"
import axios from "axios"

export const NavAddress = (props) => {
  const [nextAddress, setNextAddress] = useState('')
  const [prevAddress, setPrevAddress] = useState('')
  const boundUrl = `https://api.baserow.io/api/database/rows/table/`
  const opts = {headers: {'Authorization': `Token ${Config.apiToken}`} }

  let location = useLocation();
  let history = useHistory();

  // ---------------------------------------------------------------
  useEffect( () => {
    if(props.currentKey+1 === 1863){
      loadNextAddess(boundUrl + `27379/${1}/?user_field_names=true`)
    }else{
      loadNextAddess(boundUrl + `27379/${props.currentKey+1}/?user_field_names=true`)
    }
    loadPrevAddess(boundUrl + `27379/${props.currentKey-1}/?user_field_names=true`)
  }, [props.currentKey])

  // ---------------------------------------------------------------
  const loadNextAddess = (url) => {
    axios.get(url, opts)
    .then((res) => {  
      if (res.status === 200) {
        // handle data
          setNextAddress(res.data.address)
        
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
  const loadPrevAddess = (url) => {
    axios.get(url, opts)
    .then((res) => {  
      if (res.status === 200) {
        // handle data
          setPrevAddress(res.data.address)
        
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
  const handleScroll = (dir) => { 
    window.location.href = `/address/${dir}/`
  }

  // ---------------------------------------------------------------
  return (
    <nav className='nav-header'>
    <RoundedButton
              icon="icon-arrow-left" 
              label={`${prevAddress} Sunset Blvd.`}
              handleOnClicked={() => handleScroll(prevAddress)}
            /> 
      <div className='nav-links-container'>
        <ul>
          <li>
            <NavLink to={{pathname: location.pathname,
                      hash: '#Photographs'}}>
              <div className='nav-link'>
                Photographs
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={{pathname: location.pathname,
                      hash: '#Stories'}}>
              <div className='nav-link'>
                Stories
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={{pathname: location.pathname,
                      hash: '#Tags'}}>
              <div className='nav-link'>
                Tags
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={{pathname: location.pathname,
                      hash: '#HistoricalProfile'}}>
              <div className='nav-link'>
                Historical Profile
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <RoundedButton
              icon="icon-arrow-right" 
              label={`${nextAddress} Sunset Blvd.`}
              handleOnClicked={() => handleScroll(nextAddress)}
            />
    </nav>
  )
}