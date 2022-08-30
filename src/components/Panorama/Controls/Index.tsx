import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollDistanceSlider from "./ScrollDistanceSlider";
import SearchAndFilter from "./SearchAndFilter";
import { useAppContext, usePanoramaData } from "../../../hooks";
import iconArrowLeft from "../../../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../../../assets/icons/icon-arrow-right.svg"
import iconSearch from "../../../assets/icons/icon-search.svg"
import { toggleDirectionAddrOffset, getClosestAddressBelowString } from '../../../utiliities';
import 'rc-slider/assets/index.css';
import "../../../styles/MapControls.scss";

const MapControls = () => {
  const { modalActive } = useAppContext();
  const {
    x, 
    minX,
    maxX,
    scrollDistanceX,
    address,
    offset,
    direction,
    yearsStr
  } = usePanoramaData();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  // calculate the x values for moving left or right
  // for the left it's the greater of current center (x) minus distance the user has set for scrolling and the minimum left value plus half the width to prevent scrolling beyond the leftmost photo
  const xScrollingLeft = Math.max(x - scrollDistanceX, minX);
  const xScrollingRight = Math.min(x + scrollDistanceX, maxX);

  // create the link paths for the move left, move right, and toggle directions buttons
  const leftTo = `../../${getClosestAddressBelowString(xScrollingLeft, { direction })}/${yearsStr}`;
  const rightTo = `../../${getClosestAddressBelowString(xScrollingRight, { direction })}/${yearsStr}`;
  const otherSide = toggleDirectionAddrOffset(address, direction, offset);
  const otherSideTo = (otherSide) ? `../../../${(direction === 'n') ? 's' : 'n'}/${otherSide.addr.replace(/\s+/g, '')}-${otherSide.offset}/${yearsStr}` : '';

  // move left or right using arrow keys if the modal isn't active
  const handleArrowKeysPressed = ((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigate(leftTo, { replace: true });
    }
    if (e.key === 'ArrowRight') {
      navigate(rightTo, { replace: true });
    }
  });

  useEffect(() => {
    // only adjust map if the modal isn't open. The modal uses left/right arrow keys too to navigate.
    if (!modalActive) {
      window.addEventListener('keydown', handleArrowKeysPressed);
    } else {
      window.removeEventListener('keydown', handleArrowKeysPressed);
    }
    return () => {
      window.removeEventListener('keydown', handleArrowKeysPressed);
    }
  });

  return (
    <div className="map-controls">
      <Link
        to={otherSideTo}
        replace={true}
      >
        <button>
          {`Direction: ${direction.toUpperCase()}`}
        </button>
      </Link>

      {(Math.floor(x) > minX) ?
        <Link
          to={leftTo}
          //className={(calcAddrOffset(addrOffset, direction, width * scrollDistance * -1) === westernmostAddrOffset) ? 'disabled' : ''}
          replace={true}
          id='west'
        >
          <button className={`btn-rounded inactive`} >
            <img src={iconArrowLeft} alt="icon-arrow-left" /> {(direction === 'n') ? 'Head West' : 'Head East'}
          </button>
        </Link>
        :
        <div id='west'>
          <button className={`btn-rounded inactive disabled`} >
            <img src={iconArrowLeft} alt="icon-arrow-left" /> {(direction === 'n') ? 'Head West' : 'Head East'}
          </button>
        </div>

      }

      <ScrollDistanceSlider />

      {(Math.ceil(x) < maxX) ? (
        <Link
          to={rightTo}
          replace={true}
          id='scrollRight'
        >
          <button>
            {(direction === 'n') ? 'Head East' : 'Head West'} <img src={iconArrowRight} alt="icon-arrow-right" />
          </button>
        </Link> 
        ): (
        <div id='east'>
          <button className='disabled'>
            {(direction === 'n') ? 'Head East' : 'Head West'} <img src={iconArrowRight} alt="icon-arrow-right" />
          </button>
        </div>
      )}

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