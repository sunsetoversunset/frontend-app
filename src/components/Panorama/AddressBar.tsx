import { useEffect, useRef, useState, useContext } from "react";
import { Link, Outlet } from 'react-router-dom';
import * as d3 from "d3";
import ConditionalWrapper from "../ConditionalWrapper";
import { maxX } from '../../utiliities';
import { usePanoramaData } from "../../hooks";
import '../../styles/AddressBar.scss';

const AddressBar = () => {
  const { visibleAddresses: addresses, x, leftX, direction, years } = usePanoramaData();

  // scrolling: whether it's scrolling with an animation
  const [scrolling, setScrolling] = useState(false);
  // the translateX value for the strip container
  const [translateX, setTranslateX] = useState(leftX * -1);
  const ref = useRef(null);
  const leftXRef = useRef(leftX);
  const currentDirection = useRef(direction);

  const [visibleAddresses, setVisibleAddressess] = useState(addresses);

  // if the direction is changed, skip all transitions
  useEffect(() => {
    if (direction !== currentDirection.current) {
      leftXRef.current = leftX;
      currentDirection.current = direction;
      setVisibleAddressess(addresses);
      setTranslateX(leftX * -1);
    }
  }, [addresses, direction, x]);

  // load photos when a different address or coordinate is requested
  useEffect(() => {
    if (leftX !== leftXRef.current && currentDirection.current === direction) {
      // combine the current addresses with the new ones for the next left and right boundaries
      const addressesForScroll = addresses
        .concat(visibleAddresses)
        .filter((d, idx, arr) => arr.indexOf(d) === idx);
      setVisibleAddressess(addressesForScroll);
      setScrolling(true);
    }
  }, [leftX]);

  useEffect(() => {
    if (scrolling && ref.current) {
      d3.select(ref.current)
        .transition()
        .duration(1500)
        .style('transform', `translateX(${leftX * -1}px)`)
        .on('end', () => {
          leftXRef.current = leftX;
          // clean up the addresses
          setVisibleAddressess(addresses);
          setTranslateX(leftX * -1)
          setScrolling(false);
        });
    }
  });

  return (
    <>
      <div
        id='addressBar'
      >
        <div
          id='barContainer'
          ref={ref}
          style={{
            transform: `translateX(${translateX}px)`,
            width: maxX,
          }}
        >
          {visibleAddresses.map(label => (
            // only numerical addresses are linked to address pages
            <ConditionalWrapper
              condition={!isNaN(Number(label.label))}
              wrapper={(children: any) => (<Link to={`/address/${label.label}`}>{children}</Link>)}
              children={
                <span
                  style={{
                    position: 'absolute',
                    left: label.x,
                    color: (!isNaN(Number(label.label))) ? 'black' : '#999',
                    fontWeight: (!isNaN(Number(label.label))) ? 'bold' : 'normal',
                    textShadow: '-4px 2px 6px white, -4px -2px 6px white',
                  }}
                >
                  {label.label}
                </span>
              }
              key={label.label}
            />
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default AddressBar;