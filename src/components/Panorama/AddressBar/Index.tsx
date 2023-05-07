import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import { usePanoramaData } from "../../../hooks";
import { hasAddressData, maxX } from '../../../utiliities';
import ConditionalWrapper from "../../ConditionalWrapper";
import * as Styled from './styled';

const AddressBar = () => {
  const { visibleAddresses: addresses, x, leftX, direction } = usePanoramaData();

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
      <Styled.AddressBar>
        <div
          ref={ref}
          style={{
            transform: `translateX(${translateX}px)`,
            width: maxX,
          }}
        >
          {visibleAddresses.map(label => (
            // only addresses with data are linked to address pages
            <ConditionalWrapper
              condition={hasAddressData(label.label)}
              wrapper={(children: any) => (<Link to={`/address/${label.label}`}>{children}</Link>)}
              children={
                <Styled.Address
                  selectable={hasAddressData(label.label)}
                  style={{ left: label.x - 20 }}
                >
                  {label.label}
                </Styled.Address>
              }
              key={label.label}
            />
          ))}
        </div>
      </Styled.AddressBar>
      <Outlet />
    </>
  );
}

export default AddressBar;