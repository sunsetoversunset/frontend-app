import { useEffect, useRef, useState, useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import * as d3 from "d3";
import { DimensionsContext } from '../Contexts';
import stripLabels from '../assets/data/strip_labels.json';
import { maxX, addressToCoordinate, labels } from '../utiliities.ts';

export const AddressBar = (props) => {
  const { width } = (useContext(DimensionsContext));
  // `scrollAmount` is x coordinate centered in the strip. By default, it's half the width of the screen to position the leftmost photos left
  const { addr } = useParams();
  const direction = useParams().direction || 'n';
  const offset = parseFloat(useParams().offset) || 0;
  const scrollAmount = (addr) ? addressToCoordinate(addr) + offset : width / 2;
  const [center, setCenter] = useState(scrollAmount);
  const [scrolling, setScrolling] = useState(false);
  const ref = useRef();
  const currentDirection = useRef(direction);

  const getVisibleAddresses = (left, right) => labels.filter(d => d.direction === direction && d.x >= left && d.x <= right);

  const [visibleAddresses, setVisibleAddressess] = useState(getVisibleAddresses(scrollAmount - width / 2, scrollAmount + width / 2, scrollAmount));

  // if the direction is changed, skip all transitions
  useEffect(() => {
    setVisibleAddressess(getVisibleAddresses(scrollAmount - width / 2, scrollAmount + width / 2, scrollAmount));
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
        .duration(1000)
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
    <div
      className="strip-addresses"
      ref={ref}
      style={{
        position: 'relative',
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
  );


}