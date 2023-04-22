import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import type { URLParamsPanorama } from '../../index.d';
import { labels, years } from '../../../../utiliities';
import iconCloseRust from "../../../../assets/icons/icon-close-rust.svg";
import iconClose from "../../../../assets/icons/icon-close.svg";
import * as Styled from './styled';

const SearchAndFilter = ({ setSearchOpen }: { setSearchOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { years: yearsStr } = useParams<URLParamsPanorama>();
  const selectedYears = (yearsStr) ? yearsStr.split(',').map(y => parseInt(y)) : years;
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

  const searchOptions = labels
    .sort((a, b) => a.coordinate - b.coordinate)
    .map(d => ({
      value: `../../../${d.direction}/${d.label.replace(/\s+/g, '')}/${selectedYears}`,
      label: `${d.label}${(!Number.isNaN(d.label)) ? ' Sunset Blvd.' : ''}`
    }));
    

  return (
    <Styled.SearchAndFilter>
      <Styled.CloseButton
        onMouseEnter={() => { setIsCloseHovering(true); }}
        onMouseLeave={() => { setIsCloseHovering(false); }}
        onClick={() => { setSearchOpen(false); }}
      >
        <img src={(isCloseHovering) ? iconCloseRust : iconClose} alt="icon-close-search" />
      </Styled.CloseButton>

      <Styled.AddressSearch>
        <Select
          options={searchOptions}
          placeholder='Enter Address'
          styles={customStyles}
          onChange={(selected) => {
            if (selected?.value) {
              navigate(selected.value)
            }
            setSearchOpen(false);
          }}
        />
      </Styled.AddressSearch>
      <Styled.YearsControl>
        <Styled.YearsHeader>Display years</Styled.YearsHeader>
        {years.map(year => (
          <Styled.YearControl key={`check-${year}`}>
            <Styled.Checkbox
              type="checkbox"
              checked={selectedYears.includes(year)}
              name={`year-${year}`}
              onClick={(e) => {
                // remove it from years if it's currently checked; add it if it's not
                const updatedYears = (selectedYears.includes(year))
                  ? years.filter(y => y !== year)
                  : [...years, year].sort();
                navigate(`../${updatedYears.sort().join(',')}`);
              }}
            />
            <label htmlFor={`year-${year}`}>{year}</label>
          </Styled.YearControl>
        ))}
      </Styled.YearsControl>
    </Styled.SearchAndFilter>
  )
}

export default SearchAndFilter;