import { useRef, useState } from 'react';
import Controls from './Controls';
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

const AddressView = () => {
  const {
    address,
    addressData,
    addressHasData
  } = useAddressData();

  const [show, setShow] = useState<'photos' | 'context'>('context');

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
        {/* <ScrollToTop /> */}
        <Header />
        <Controls
          show={show}
          setShow={setShow}
        />
        {(show === 'photos') && (
          <PhotoStrips />
        )}
        {(show === 'context') && (
          <div>
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
        )}
        </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;