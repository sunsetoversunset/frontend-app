import { useState } from 'react';
import { AddressDataContext } from '../../Contexts';
import { useAddressData } from '../../hooks';
import '../../styles/AddressView.scss';
import PhotoStrips from '../Panorama/PhotoStrips';
import Controls from './Controls';
import Header from './Header/Index';
import CensusTable from './Tables/Census';
import NewspaperTable from './Tables/Newspaper';
import OccupancyTable from './Tables/Occupancy';
import SocialCulturalTable from './Tables/SocialCultural';
import TaxAssessments from './Tables/TaxAssessments';

const AddressView = () => {
  const {
    address,
    addressData,
    addressHasData
  } = useAddressData();

  const [show, setShow] = useState<'photos' | 'context'>('context');

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
          <div id='historicalcontext'>

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
            <div id="zimas">
              <h1>
                Search ZIMAS (Zone Information and Map Access System)
              </h1>
              <p>
                <a href="https://zimas.lacity.org/" target="_blank">Click here to open the search page on the ZIMAS site</a>
              </p>
              <p>You'll then need to do the following:</p>
              <ol>
                <li>Enter <strong>{address}</strong> in the "House Number" field and <strong>Sunset</strong> as the "Street Name" (no prefixes or suffixes).</li>
                <li>Click <strong>"GO"</strong> to find records for this address.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;