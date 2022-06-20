import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CensusTable from './CensusTable';
import OccupancyTable from './OccupancyTable';
import NewspaperTable from './NewspaperTable';
import { AddressDataContext } from '../../Contexts';
import { AddressData } from '../../types/AddressView';
import { PhotoStripAddress } from "../PhotoStripAddress";
import '../../styles/AddressView.scss';

const AddressView = () => {
  const { address } = useParams();
  const [addressData, setAddressData] = useState<AddressData>();

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

        <div id="photographs" className="strip-container-wrap">
          <h1>Photographs</h1>
          <div className="photo-strip">
            {(addressData && addressData.photos) && (
              <>
                {[1966, 1973, 1985, 1995, 2007].map(year => (
                  <PhotoStripAddress
                    handleSetModalImg={() => false}
                    handleShowModal={() => false}
                    key={`year-${year}`}
                    year={year}
                    photoData={addressData.photos
                      .filter((photo: any) => photo.year === year)
                      .map((photo: any) => ({
                        year: photo.year,
                        photoId: photo.id,
                        street_side: addressData.side,
                      }))}
                  />
                ))}
              </>
            )}
          </div>

          <CensusTable />
          <OccupancyTable />
          <NewspaperTable />
        </div>
      </div>
    </AddressDataContext.Provider>
  );
}

export default AddressView;