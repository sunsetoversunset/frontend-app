import React, { useState, useContext } from "react";
import "../../styles/PhotoStrip.scss";
import PhotoViewerModal from "../PhotoViewerModal";
import { AddressDataContext } from "../../Contexts";
import { AddressData } from '../../types/AddressView';

const PhotoStripAddress = ({year}: { year: number }) => {
  const { photos: allPhotos } = useContext(AddressDataContext) as AddressData;
  const photos = allPhotos.filter((photo: any) => photo.year === year);
  const [modalId, setModalId] = useState<string>();

  return (
    <>
      <div className={`strip-container`}>
        <div className={`strip-photos-container-address year-${year}`}>
          {photos.map(photo => (
            <img
              alt=''
              className="address"
              src={`https://media.getty.edu/iiif/image/${photo.id}/full/,250/0/default.jpg`}
              onClick={() => {
                setModalId(photo.id);
              }}
              key={photo.id}
            />
          ))}
        </div>
      </div>
      <div className='strip-year-label-outer-container'>
        <div className="strip-year-label-inner-container">
          <span className="strip-year-label">{year}</span>
        </div>
      </div>
      {(modalId) && (
        <PhotoViewerModal
          id={modalId}
          setModalId={setModalId}
        />
      )}
    </>
  )
}

export default PhotoStripAddress;