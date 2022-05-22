import { useEffect, useRef, useState, useContext } from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import * as d3 from "d3";
import { DimensionsContext, PanoramaContext } from '../../Contexts';
import { addrOffsetToCoordinate, labels } from '../../utiliities';
import { Dimensions } from "../../index.d";
import { URLParamsPanorama, PanoramaContextParams } from './index.d';
import '../../styles/AddressBar.scss';

const AddressBar = () => {
  const { width } = (useContext(DimensionsContext) as Dimensions);
  const { scrollSpeed } = useContext(PanoramaContext) as PanoramaContextParams;
  // `scrollAmount` is x coordinate centered in the strip. By default, it's half the width of the screen to position the leftmost photos left
  const { addrOffset, direction } = useParams<URLParamsPanorama>();
  const scrollAmount = addrOffsetToCoordinate(addrOffset || '');
  const [center, setCenter] = useState(scrollAmount);
  const [scrolling, setScrolling] = useState(false);
  const ref = useRef(null);
  const currentDirection = useRef(direction);

  const getVisibleAddresses = (left: number, right: number) => labels.filter(d => d.direction === direction && d.x >= left && d.x <= right);

  const [visibleAddresses, setVisibleAddressess] = useState(getVisibleAddresses(scrollAmount - width / 2, scrollAmount + width / 2));

  // if the direction is changed, skip all transitions
  useEffect(() => {
    setVisibleAddressess(getVisibleAddresses(scrollAmount - width / 2, scrollAmount + width / 2));
    setCenter(scrollAmount);
    currentDirection.current = direction;
  }, [direction]);

  // load photos when a different address or coordinate is requested
  useEffect(() => {
    if (scrollAmount !== center && currentDirection.current === direction) {
      const left = (scrollAmount < center) ? scrollAmount - width / 2 : center - width / 2;
      const right = (scrollAmount < center) ? center + width / 2 : scrollAmount + width / 2;

      // get the photoset that will be visible after scrolling
      const addressesForScroll = getVisibleAddresses(left, right);
      setVisibleAddressess(addressesForScroll);
      setScrolling(true);
    }
  }, [scrollAmount]);

  useEffect(() => {
    if (scrolling && ref.current) {
      d3.select(ref.current)
        .transition()
        // TODO: should this be variable depending on the distance scrolled to?
        .duration(scrollSpeed)
        .style('transform', `translateX(-${scrollAmount - width / 2}px)`)
        .on('end', () => {
          const left = scrollAmount - width / 2;
          const right = scrollAmount + width / 2;
          setScrolling(false);
          // clean up the addresses
          const addresses = getVisibleAddresses(left, right);
          setVisibleAddressess(addresses);
          setCenter(scrollAmount);
        });
    }
  });

  return (
    <>
      <div
        id='addressBar'
        ref={ref}
        style={{
          transform: `translateX(-${center - width / 2}px)`
        }}
      >
        {visibleAddresses.map(label => (
          <Link
            to={`/address/${label.label}`}
            key={label.label}
          >
            <span
              style={{
                position: 'absolute',
                left: label.x,
              }}
            >
              {label.label}
            </span>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );


}

export default AddressBar;