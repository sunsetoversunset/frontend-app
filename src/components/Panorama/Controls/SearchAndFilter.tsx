import { useState } from 'react';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import iconClose from "../../../assets/icons/icon-close.svg"
import iconCloseRust from "../../../assets/icons/icon-close-rust.svg"
import iconCheck from "../../../assets/icons/icon-check.svg"
import strip_labels from '../../../assets/data/strip_labels.json';
import type { URLParamsPanorama } from '../index.d';
import "../../../styles/SearchAndFilter.scss"

const SearchAndFilter = ({setSearchOpen}: { setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { years: yearsStr } = useParams<URLParamsPanorama>();
  const years = (yearsStr) ? yearsStr.split(',').map(y => parseInt(y)) : [1966, 1973, 1985, 1995, 2007];
  const [isCloseHovering, setIsCloseHovering] = useState(false);

  const navigate = useNavigate();

  const customStyles = {
    control: (provided: any, state: any) => {
      const border = (state.isFocused) ? '1px solid #FBA92C' : '1px solid black';
      return {
        ...provided,
        border,
        borderRadius: 20,
        backgroundColor: 'white',
        '&:hover': {
          borderColor: '#FBA92C',
        }
      };
    },
    menu: (provided: any, state: any) => {
      return {
        ...provided,
        backgroundColor: '#eee',
        border: '1px solid black',
        borderRadius: 10,
        boxShadow: 'none',
        padding: '0 0px',
        //transform: `translateX(-${(dataViewerWidth - 300) / 2}px)`,
      }
    },
    menuList: (provided: any, state: any) => {
      return {
        ...provided,
        padding: '0, auto',
      }
    },
  };

  const searchOptions = strip_labels
    .filter(label => label.l)
    .map(label => {
      const displayLabel = (typeof label.l === 'number') ? `${label.l} Sunset Blvd.` : label.l;
      return {
        value: `../../../${label.s}/${label.l.toString().replace(/\s+/g, '')}/${years}`,
        label: displayLabel,
      };
    })
    .sort((a, b) => {
      if (!Number.isNaN(a.label.charAt(0)) && Number.isNaN(b.label.charAt(0))) {
        return 1;
      } else if (Number.isNaN(a.label.charAt(0)) && !Number.isNaN(b.label.charAt(0))) {
        return -1;
      }
      return (a.label > b.label) ? 1 : -1
    });


  // ---------------------------------------------------------
  return (
    <div className={`search-and-filter-opts`}>
      <label htmlFor="search-and-filter-control" className="hidden">
        Close search and filter control
      </label>
      <button
        onMouseEnter={() => setIsCloseHovering(true)}
        onMouseLeave={() => setIsCloseHovering(false)}
        id="search-and-filter-control"
        className="icon-close-search-container"
        onClick={() => setSearchOpen(false)}
      >
        {
          isCloseHovering ?
            <img src={iconCloseRust} alt="icon-close-search" /> :
            <img src={iconClose} alt="icon-close-search" />
        }
      </button>

      <div className='search-control'>
        <Select
          options={searchOptions}
          placeholder='search'
          styles={customStyles}
          onChange={(selected) => {
            if (selected?.value) {
              navigate(selected.value)
            }
            setSearchOpen(false);
          }}
        />
      </div>
      <div className="years-control">
        <label className="control-label">Display years</label>
        [{[1966, 1973, 1985, 1995, 2007].map(year => {
          return (
            <div
              key={`check-${year}`}
              className={`year-control ${years.includes(year) ? 'checked' : ''}`}
              onClick={(e) => {
                // remove it from years if it's currently checked; add it if it's not
                const updatedYears = (years.includes(year))
                  ? years.filter(y => y !== year)
                  : [...years, year].sort();
                navigate(`../${updatedYears.sort().join(',')}`);
              }}
            >
              <input
                checked={years.includes(year)}
                id={`year-${year}`}
                className="year-checkbox"
                name={`year-${year}`}
                type="checkbox"
              />
              {(years.includes(year)) && (
                  <img
                    className='icon-year-checked'
                    src={iconCheck}
                    alt="icon-year-checked"
                  />
              )}
              {/*<label
                className="hidden"
                htmlFor={`year-${year}`}
              >
                {
                  props.yearsShowing[year] ?
                    `Hide ${year}` : `Show ${year}`
                }
              </label>*/}
              <span className="year-label"

              >{year}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchAndFilter;