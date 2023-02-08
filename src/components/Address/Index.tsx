import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import CensusTable from './Tables/Census';
import OccupancyTable from './Tables/Occupancy';
import NewspaperTable from './Tables/Newspaper';
import SocialCulturalTable from './Tables/SocialCultural';
import TaxAssessments from './Tables/TaxAssessments';
import PhotoStrips from '../Panorama/PhotoStrips';
import ScrollToTop from '../ScrollToTop';
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
        <ScrollToTop />
        <Header />

        <nav>
          {(previousAddress)
            ? <Link to={`../${previousAddress}`} className='previous address_button'><img src={iconArrowLeft} alt="icon-arrow-left" /> {previousAddress}</Link>
            : <span />
          }
          <div
            onClick={() => {
              window.scrollTo({
                top: 340,
                behavior: 'smooth',
              });
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
            ? <Link to={`../${nextAddress}`} className='next address_button'>{nextAddress} <img src={iconArrowRight} alt="icon-arrow-right" /> </Link>
            : <span />
          }
        </nav>

        <div id="photographs" className="strip-container-wrap">
          {/* <h1 ref={photosRef}>Photographs</h1> */}
          <PhotoStrips />
        </div>
        <h1 ref={historicalProfileRef}>Historical Profile</h1>
        <OccupancyTable />
        <NewspaperTable />
        <SocialCulturalTable />
        <CensusTable />
        <TaxAssessments />
        
          <div id="building_records">
            <h1>
              Search Building Records
            </h1>
            <p>
            <a href="https://ladbsdoc.lacity.org/IDISPublic_Records/idis/DocumentSearchSelection.aspx" target="_blank">Click here to open the search page on the Los Angeles Department of Buildings and Safety site.</a></p><p>You'll then need to do the following:
            </p>
            <ol>
              <li>Click <strong>"By Address"</strong></li>
              <li>Enter <strong>{address} W Sunset Blvd</strong>, using exactly that text, including the direction and the abbreviated "Blvd".</li>
              <li>Click <strong>"Search"</strong> to find building records for this address.</li>
            </ol>
          </div>
      </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;