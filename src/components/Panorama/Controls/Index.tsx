import 'rc-slider/assets/index.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import iconArrowLeft from "../../../assets/icons/icon-arrow-left.svg";
import iconArrowRight from "../../../assets/icons/icon-arrow-right.svg";
import iconSearch from "../../../assets/icons/icon-search.svg";
import { sizes } from '../../../constants';
import { useAppContext, usePanoramaData } from "../../../hooks";
import { getAddressOffsetString, toggleDirectionAddrOffset } from '../../../utiliities';
import ScrollDistanceSlider from "./ScrollDistanceSlider/Index";
import SearchAndFilter from "./SearchAndFilter/Index";
import * as Styled from './styled';

const MapControls = () => {
  const { modalActive, width } = useAppContext();
  const {
    x,
    minX,
    maxX,
    scrollDistanceX,
    address,
    offset,
    direction,
    yearsStr,
  } = usePanoramaData();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  // calculate the x values for moving left or right
  // for the left it's the greater of current center (x) minus distance the user has set for scrolling and the minimum left value plus half the width to prevent scrolling beyond the leftmost photo
  const xScrollingLeft = Math.max(x - scrollDistanceX, minX);
  const xScrollingRight = Math.min(x + scrollDistanceX, maxX);

  // create the link paths for the move left, move right, and toggle directions buttons
  const leftTo = `../../${getAddressOffsetString(xScrollingLeft, direction, { direction })}/${yearsStr}`;
  const rightTo = `../../${getAddressOffsetString(xScrollingRight, direction, { direction })}/${yearsStr}`;
  const otherSide = toggleDirectionAddrOffset(address, direction, offset);
  const otherSideTo = (otherSide) ? `../../../${(direction === 'n') ? 's' : 'n'}/${otherSide.addr.replace(/\s+/g, '')}-${otherSide.offset}/${yearsStr}` : '';

  useEffect(() => {
    // move left or right using arrow keys if the modal isn't active
    const handleArrowKeysPressed = ((e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(leftTo, { replace: true });
      }
      if (e.key === 'ArrowRight') {
        navigate(rightTo, { replace: true });
      }
    });

    // only adjust map if the modal isn't open. The modal uses left/right arrow keys too to navigate.
    if (!modalActive) {
      window.addEventListener('keydown', handleArrowKeysPressed);
    } else {
      window.removeEventListener('keydown', handleArrowKeysPressed);
    }
    return () => {
      window.removeEventListener('keydown', handleArrowKeysPressed);
    }
  }, [modalActive, leftTo, rightTo, navigate]);

  return (
    <Styled.MapControls>
      <Styled.MoveLink
        to={otherSideTo}
        replace={true}
      >
        {`Look ${(direction === 'n') ? 'South' : 'North'}`}
      </Styled.MoveLink>

      <Styled.MoveLink
        to={leftTo}
        replace={true}
        justifyself="right"
        disabled={(Math.floor(x) <= minX)}
      >
        <img src={iconArrowLeft} alt="icon-arrow-left" /> {(direction === 'n') ? 'Head West' : 'Head East'}
      </Styled.MoveLink>

      {(width >= sizes.tablet) && (
        <ScrollDistanceSlider />
      )}

      <Styled.MoveLink
        to={rightTo}
        replace={true}
        justifyself="left"
        disabled={(Math.ceil(x) >= maxX)}
      >
        <span>{(direction === 'n') ? 'Head East' : 'Head West'}</span> <img src={iconArrowRight} alt="icon-arrow-right" />
      </Styled.MoveLink>

      <Styled.SearchAndFilterButton
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <img src={iconSearch} alt="icon-search" /> Search & Filter
      </Styled.SearchAndFilterButton>

      {(searchOpen) && (
        <SearchAndFilter
          setSearchOpen={setSearchOpen}
        />
      )}
    </Styled.MapControls>
  )
}

export default MapControls;