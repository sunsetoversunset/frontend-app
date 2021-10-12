import { useState, useEffect, useRef} from 'react'
import { RoundedButton } from "./Buttons"
import '../styles/NavHeader.scss';

import Config from "../config.json"
import axios from "axios"

export const NavAddress = (props) => {
  const [nextAddress, setNextAddress] = useState('')
  const [prevAddress, setPrevAddress] = useState('')
  const navRef = useRef(null)
  const boundUrl = `https://api.baserow.io/api/database/rows/table/`
  const opts = {headers: {'Authorization': `Token ${Config.apiToken}`} }

  // ---------------------------------------------------------------
  useEffect( () => {
    if(props.currentKey+1 === 1863){
      loadNextAddess(boundUrl + `27379/${1}/?user_field_names=true`)
    }else{
      loadNextAddess(boundUrl + `27379/${props.currentKey+1}/?user_field_names=true`)
    }
    loadPrevAddess(boundUrl + `27379/${props.currentKey-1}/?user_field_names=true`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentKey, boundUrl])


  // ---------------------------------------------------------------
    window.onscroll = (e) =>{
        let st = window.pageYOffset
        if (st > 419){
         navRef.current.classList.add('stuck')
       }else{
        navRef.current.classList.remove('stuck')
       }
    }

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
    window.location.href = `/#/address/${dir}/`
  }

  const anchorScroll = (hash) => {
    document.getElementById(hash).scrollIntoView({behavior: "smooth", block: "start"});
  }

  // ---------------------------------------------------------------
  return (
    <nav className='nav-header' ref={navRef}>
    <RoundedButton
              icon="icon-arrow-left" 
              label={`${prevAddress} Sunset Blvd.`}
              handleOnClicked={() => handleScroll(prevAddress)}
            /> 
      <div className='nav-links-container'>
        <ul>
          <li>
            <div className="currentAddress">
            {props.address} Sunset Blvd.
            </div>
          </li>
          <li>
            <span  onClick={ () => anchorScroll("photographs")}>
              <div tabIndex="0" className='nav-link'>
                Photographs
              </div>
            </span>
          </li>
          {/*<li>
            <span onClick={ () => anchorScroll("stories")}>
              <div tabIndex="0" className='nav-link'>
                Stories
              </div>
            </span>
          </li>
          <li>
            <span onClick={ () => anchorScroll("tags")} >
              <div tabIndex="0" className='nav-link'>
                Tags
              </div>
            </span>
          </li>*/}
          <li>
            <span  onClick={ () => anchorScroll("historicalProfile")}>
              <div tabIndex="0" className='nav-link'>
                Historical Profile
              </div>
            </span>
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