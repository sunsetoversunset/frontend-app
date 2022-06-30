import { useState, useContext } from "react";
import { useParams, Link, } from 'react-router-dom';
import Slider from 'rc-slider';
import { DimensionsContext, PanoramaContext } from '../../Contexts';
import { SearchAndFilter } from "./SearchAndFilter"
import iconArrowLeft from "../../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../../assets/icons/icon-arrow-right.svg"
import iconSearch from "../../assets/icons/icon-search.svg"
import { calcAddrOffset, toggleDirectionAddrOffset, getWesternmostLabel, getEasternmostLabel } from '../../utiliities';
import { Dimensions } from '../../index.d'
import { URLParamsPanorama, PanoramaContextParams } from "./index.d";
import 'rc-slider/assets/index.css';
import "../../styles/MapControls.scss";

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
const MapControls = () => {
  const { width } = (useContext(DimensionsContext) as Dimensions);
  const { scrollDistance, setScrollDistance } = useContext(PanoramaContext) as PanoramaContextParams;

  const { addrOffset, years, direction } = useParams() as URLParamsPanorama;

  const [searchOpen, setSearchOpen] = useState(false);

  const westernmostAddrOffset = `${getWesternmostLabel(direction).label.toString().replace(/\s+/g, '')}-0`;

  return (
    <div className="map-controls">
      <Link
        to={`../../../${(direction === 'n') ? 's' : 'n'}/${toggleDirectionAddrOffset(addrOffset, direction)}/${years}`}
        replace={true}
      >
        <button>
          {`Direction: ${direction.toUpperCase()}`}
        </button>
      </Link>


      <Link
        to={`../../${calcAddrOffset(addrOffset, direction, width * scrollDistance * -1)}/${years}`}
        //className={(calcAddrOffset(addrOffset, direction, width * scrollDistance * -1) === westernmostAddrOffset) ? 'disabled' : ''}
        replace={true}
        id='west'
      >
        <button className={`btn-rounded inactive`} >
          <img src={iconArrowLeft} alt="icon-arrow-left" /> {(direction === 'n') ? 'Head West' : 'Head East'}
        </button>
      </Link>
      <div id="scroll_speed_control">
        <h6>Scroll Distance</h6>
        <label>Less</label>
        <Slider
          min={2}
          max={10}
          defaultValue={scrollDistance * 10}
          onChange={(value) => {
            setScrollDistance((value as number / 10))
          }}
          handleStyle={{
            borderColor: 'black',
            backgroundColor: 'orange',
            opacity: 0.9,
          }}
          trackStyle={{
            backgroundColor: 'grey'
          }}
          railStyle={{
            backgroundColor: 'grey'
          }}
          className="slider"
      
        />
        <label>More</label>
      </div>
      {/* <button onClick={() => {
        setScrollSpeed(scrollSpeed + 250);
      }}>slower</button>
      <div>Scroll Speed</div>
      <button
        className={(scrollSpeed < 500) ? 'disabled' : ''}
        onClick={() => {
          if (scrollSpeed >= 500) {
            setScrollSpeed(scrollSpeed - 250);
          }
        }}
      >faster</button> */}

      <Link
        to={`../../${calcAddrOffset(addrOffset, direction, width * scrollDistance)}/${years}`}
        replace={true}
        id='scrollRight'
      >
        <button>
          {(direction === 'n') ? 'Head East' : 'Head West'} <img src={iconArrowRight} alt="icon-arrow-right" />
        </button>
      </Link>
      <button
        id='searchAndFilter'
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <img src={iconSearch} alt="icon-search" /> Search & Filter
      </button>


      {(searchOpen) && (
        <SearchAndFilter
          setSearchOpen={setSearchOpen}
        />
      )}
    </div>
  )
}

export default MapControls;