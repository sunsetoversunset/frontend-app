import { useState } from 'react'
import iconClose from "../assets/icons/icon-close.svg"
import iconCloseRust from "../assets/icons/icon-close-rust.svg"
import iconCheck from "../assets/icons/icon-check.svg"
import { dataFields } from "../assets/data/dataFields"
import "../styles/SearchAndFilter.scss"

export const SearchAndFilter = (props) => {
  const [ searchInput, setSearchInput ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])
  const [ isCloseHovering, setIsCloseHovering ] = useState(false)


  // ---------------------------------------------------------
  const handleSearch = (searchTerm) => {
    if (props.allAddresses) {
      setSearchInput(searchTerm)
      let results = props.allAddresses.filter((addressObj) => {
        return searchTerm.includes(addressObj.address) || addressObj.address.includes(searchTerm)
      })

      // Return the first 8
      setSearchResults(results.slice(0, 7))
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
      <label htmlFor="search-and-filter-control" className="hidden">
        Close search and filter control
      </label>
      <button
        onMouseEnter={() => setIsCloseHovering(true)}
        onMouseLeave={() => setIsCloseHovering(false)}
        id="search-and-filter-control" 
        className="icon-close-search-container"
        onClick={() => props.setIsSearchAndFilterShowing(false)}
      >
        {
          isCloseHovering? 
          <img src={iconCloseRust} alt="icon-close-search" /> :
          <img src={iconClose} alt="icon-close-search" />
        }
      </button>
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