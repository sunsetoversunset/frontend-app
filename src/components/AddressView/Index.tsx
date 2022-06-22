import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import CensusTable from './CensusTable';
import OccupancyTable from './OccupancyTable';
import NewspaperTable from './NewspaperTable';
import PhotoStripAddress from "./PhotoStripAddress";
import { AddressDataContext } from '../../Contexts';
import { AddressData } from '../../types/AddressView';
import { getClosestAddressBelow, getClosestAddressAbove, addressToCoordinate } from '../../utiliities';
import '../../styles/AddressView.scss';
import iconArrowLeft from "../../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../../assets/icons/icon-arrow-right.svg"

const AddressView = () => {
  const { address } = useParams() as { address: string };
  const [addressData, setAddressData] = useState<AddressData>();
  const historicalProfileRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    axios.get(`/address_data/${address}.json`)
      .then(response => {
        setAddressData(response.data as AddressData);
      });
    return () => { source.cancel(); }
  }, [address]);

  if (!addressData) {
    return null;
  }

  const previousAddressData = getClosestAddressBelow(addressToCoordinate(address) - 0.001, addressData.side);
  const previousAddress = (previousAddressData) ? previousAddressData.addr : null;
  const nextAddressData = getClosestAddressAbove(addressToCoordinate(address) + 0.001, addressData.side);
  const nextAddress = (nextAddressData) ? nextAddressData.addr : null;

  return (
    <AddressDataContext.Provider value={addressData}>
      <div className="app-page" id="address-page">
        <div
          className="header-image"
          style={{
            background: `url('https://media.getty.edu/iiif/image/${addressData.photos[Math.floor(Math.random() * addressData.photos.length)].id}/full/,1000/0/default.jpg')`
          }}
        >
          <p className="hero-address">{address} Sunset Boulevard</p>
        </div>

        <nav>
          {(previousAddress)
            ? <Link to={`../${previousAddress}`}><img src={iconArrowLeft} alt="icon-arrow-left" /> {previousAddress}</Link>
            : <span />
          }
          <div
            onClick={() => {
              if (photosRef.current) {
                photosRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className='photos'
          >
            Photographs
          </div>
          <div
            onClick={() => {
              if (historicalProfileRef.current) {
                historicalProfileRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Historical Profile
          </div>
          {(nextAddress)
            ? <Link to={`../${nextAddress}`} className='next'>{nextAddress} <img src={iconArrowRight} alt="icon-arrow-right" /> </Link>
            : <span />
          }
        </nav>

        <div id="photographs" className="strip-container-wrap">
          <h1 ref={photosRef}>Photographs</h1>
          <div className="photo-strip">
            {(addressData && addressData.photos) && (
              <>
                {[1966, 1973, 1985, 1995, 2007].map(year => (
                  <PhotoStripAddress
                    key={`year-${year}`}
                    year={year}
                  />
                ))}
              </>
            )}
          </div>

          <h1 ref={historicalProfileRef}>Historical Profile</h1>
          <CensusTable />
          <OccupancyTable />
          <NewspaperTable />
        </div>
      </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;