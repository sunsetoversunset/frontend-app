import { useState, useContext } from "react";
import { useParams, Link, } from 'react-router-dom';
import { DimensionsContext } from '../Contexts';
import { SearchAndFilter } from "./SearchAndFilter"
import iconArrowLeft from "../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../assets/icons/icon-arrow-right.svg"
import iconSearch from "../assets/icons/icon-search.svg"
import { calcAddrOffset, toggleDirectionAddrOffset } from '../utiliities';
import { Dimensions, URLParamsPanorama} from '../index.d'
import "../styles/MapControls.scss";

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
const MapControls = () => {
  const { width } = (useContext(DimensionsContext) as Dimensions);
  const { addrOffset, years, direction } = useParams() as URLParamsPanorama;

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="map-controls">
      <Link to={`../../${calcAddrOffset(addrOffset, direction, width * -0.4)}/${years}`}>
        <button className={`btn-rounded inactive`}>
          <img src={iconArrowLeft} alt="icon-arrow-left" /> {(direction === 'n') ? 'Head West' : 'Head East'}
        </button>
      </Link>
      <Link to={`../../../${(direction === 'n') ? 's' : 'n'}/${toggleDirectionAddrOffset(addrOffset, direction)}/${years}`}>
        <button>
          {`Direction: ${direction.toUpperCase()}`}
        </button>
      </Link>
      <button
        id='searchAndFilter'
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <img src={iconSearch} alt="icon-search" /> Search & Filter
      </button>
      <Link
        to={`../../${calcAddrOffset(addrOffset, direction, width * 0.4)}/${years}`}
        id='scrollRight'
      >
        <button>
          {(direction === 'n') ? 'Head East' : 'Head West'} <img src={iconArrowRight} alt="icon-arrow-right" />
        </button>
      </Link>
      {(searchOpen) && (
        <SearchAndFilter
          yearsShowing={[1966]}
          setSearchOpen={setSearchOpen}
        />
      )}
    </div>
  )
}

export default MapControls;