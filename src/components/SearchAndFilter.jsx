import { useState, useEffect } from 'react'
import iconClose from "../assets/icons/icon-close.svg"
import iconCheck from "../assets/icons/icon-check.svg"
import { dataFields } from "../assets/data/dataFields"
import "../styles/SearchAndFilter.scss"

export const SearchAndFilter = (props) => {
  const [ searchInput, setSearchInput ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])


  // ---------------------------------------------------------
  const handleSearch = (searchTerm) => {
    if (props.allAddresses) {
      setSearchInput(searchTerm)
      let results = props.allAddresses.filter((addressObj) => {
        return searchTerm.includes(addressObj.address) || addressObj.address.includes(searchTerm)
      })

      // Return the first 8
      setSearchResults(results.slice(0, 7))
    } else {
      console.log('no addresses')
    }
  }  

  // ---------------------------------------------------------
  const handleSelectAddress = (address) => {
    setSearchInput('')
    props.handleCenterAddress(address)
  }

  // ---------------------------------------------------------
  const renderSearchResults = () => {
    return (
      <ul className='search-results-list'>
        {
          searchResults.map((result, idx) => {
            return (
              <li key={`result-${idx}`}>
                <div 
                  className="result-list-item"
                  onClick={() => handleSelectAddress(result.address)}
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


  // ---------------------------------------------------------
  const renderYearsControls = () => {
    return (
      <div className="years-control">
        <label className="control-label">Display years</label>
        { dataFields.map(dataField => {
          return (
            <div
              key={`check-${dataField.year}`} 
              className={`year-control ${props.yearsShowing[dataField.year] ? 'checked' : ''}`}
              onClick={() => {
                let currentYearsShowing = {...props.yearsShowing}
                currentYearsShowing[dataField.year] = !currentYearsShowing[dataField.year]
                props.setYearsShowing(currentYearsShowing)
              }}
            >
              <input 
                checked={props.yearsShowing[dataField.year]}
                id={`year-${dataField.year}`}
                className="year-checkbox"
                name={`year-${dataField.year}`}
                type="checkbox" 
              />
              {
                props.yearsShowing[dataField.year] === true ?
                <img 
                  className='icon-year-checked'
                  src={iconCheck} 
                  alt="icon-year-checked" 
                /> : null
              }
              <label
                onClick={(e) => {
                  e.preventDefault()
                  let currentYearsShowing = {...props.yearsShowing}
                  currentYearsShowing[dataField.year] = !currentYearsShowing[dataField.year]
                  props.setYearsShowing(currentYearsShowing)
                }} 
                className="hidden" 
                htmlFor={`year-${dataField.year}`}
              >
                {
                  props.yearsShowing[dataField.year] ? 
                  `Hide ${dataField.year}` : `Show ${dataField.year}`
                }
              </label>
              <span className="year-label">{dataField.year}</span>
            </div>
          )
        }) }
      </div>
    )
  }
  

  // ---------------------------------------------------------
  return (
    <div className={`search-and-filter-opts ${props.isSearchAndFilterShowing ? "visible" : ""}`}>
      <div 
        className="icon-close-search-container"
        onClick={() => props.setIsSearchAndFilterShowing(false)}
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