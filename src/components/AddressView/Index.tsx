import axios, { AxiosError } from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CensusTable from './CensusTable';
import OccupancyTable from './OccupancyTable';
import NewspaperTable from './NewspaperTable';
import PhotoStripAddress from "./PhotoStripAddress";
import { AddressDataContext, DimensionsContext } from '../../Contexts';
import { AddressData } from '../../types/AddressView';
import { getClosestAddressBelow, getClosestAddressAbove, addressToCoordinate } from '../../utiliities';
import '../../styles/AddressView.scss';
import iconArrowLeft from "../../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../../assets/icons/icon-arrow-right.svg"
import { readJsonConfigFile } from 'typescript';

const AddressView = () => {
  const { address } = useParams() as { address: string };
  const { width } = useContext(DimensionsContext);
  const [addressData, setAddressData] = useState<AddressData>();
  const historicalProfileRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<HTMLHeadingElement>(null);
  const [addressHasData, setAddressHasData] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    axios.get(`/address_data/${address}.json`)
      .then(response => {
        setAddressData(response.data as AddressData);
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 404) {
          setAddressHasData(false);
        };
      });
    return () => { source.cancel(); }
  }, [address]);



  if (!addressHasData) {
    return (
      <div className="app-page" id="address-page">
        <p>{`${address} isn't a valid address.`}</p>

      </div>
    )
  }

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
            backgroundImage: `url('https://media.getty.edu/iiif/image/${addressData.photos[Math.floor(Math.random() * addressData.photos.length)].id}/full/,${width}/0/default.jpg')`,
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

        </div>
        <h1 ref={historicalProfileRef}>Historical Profile</h1>
        <OccupancyTable />
        <NewspaperTable />
        <CensusTable />
      </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;