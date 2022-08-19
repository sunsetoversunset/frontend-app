import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import CensusTable from './Tables/Census';
import OccupancyTable from './Tables/Occupancy';
import NewspaperTable from './Tables/Newspaper';
import SocialCulturalTable from './Tables/SocialCultural';
import BuildingRecordsTable from './Tables/BuildingRecords';
import PhotoStrips from '../Panorama/PhotoStrips';
import { AddressDataContext } from '../../Contexts';
import { useAddressData } from '../../hooks';
import '../../styles/AddressView.scss';
import iconArrowLeft from "../../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../../assets/icons/icon-arrow-right.svg"

const AddressView = () => {
  const {
    address, 
    addressData, 
    previousAddress, 
    nextAddress, 
    addressHasData 
  } = useAddressData();

  const historicalProfileRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <AddressDataContext.Provider value={addressData}>
      <div className="app-page" id="address-page">
        <Header />

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
          <PhotoStrips />
        </div>
        <h1 ref={historicalProfileRef}>Historical Profile</h1>
        <OccupancyTable />
        <NewspaperTable />
        <SocialCulturalTable />
        <CensusTable />
        <BuildingRecordsTable />
      </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;