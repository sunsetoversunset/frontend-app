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
  const { width, modalActive } = useAppContext();
  const { address, offset, direction, years, scrollDistance, x, leftX, rightX, maxX } = usePanoramaData();
  const navigate = useNavigate();
  console.log(maxX, x, rightX, rightX - width < maxX);


  const [searchOpen, setSearchOpen] = useState(false);

  const leftTo = `../../${getClosestAddressBelowString(Math.max(x - width * scrollDistance, width / 2), { direction })}/${years}`;
  const rightTo = `../../${getClosestAddressBelowString(Math.min(x + width * scrollDistance, maxX), { direction })}/${years}`;
  const otherSide = toggleDirectionAddrOffset(address, direction, offset);
  const otherSideTo = (otherSide) ? `../../../${(direction === 'n') ? 's' : 'n'}/${otherSide.addr.replace(/\s+/g, '')}-${otherSide.offset}/${years}` : '';

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

      {(leftX > 0) ?
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

      {(x + width * scrollDistance < maxX) ? (
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