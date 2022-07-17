import React, { useState, useContext } from "react";
import "../../styles/PhotoStrip.scss";
import PhotoViewerModal from "../PhotoViewerModal";
import { AddressDataContext } from "../../Contexts";
import { AddressData } from '../../types/AddressView.d';

const PhotoStripAddress = ({year}: { year: number }) => {
  const { photos: allPhotos } = useContext(AddressDataContext) as AddressData;
  const photos = allPhotos.filter((photo: any) => photo.year === year);
  const [modalId, setModalId] = useState<string>();

  const getNextId = (id: string) => {
    const thePhoto = photos.find(photo => photo.id === id);
    if (thePhoto) {
      const photosAbove = photos
        .filter(photo => photo.coordinate > thePhoto.coordinate)
        .sort((a, b) => a.coordinate - b.coordinate)
      return (photosAbove.length > 0) ? photosAbove[0].id : undefined
    }
    return undefined;
  }

  const getPreviousId = (id: string) => {
    const thePhoto = photos.find(photo => photo.id === id);
    if (thePhoto) {
      const photosBelow = photos
        .filter(photo => photo.coordinate < thePhoto.coordinate)
        .sort((a, b) => b.coordinate - a.coordinate)
      return (photosBelow.length > 0) ? photosBelow[0].id : undefined
    }
    return undefined;
  }

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
          x={0}
          previousId={getPreviousId(modalId)}
          nextId={getNextId(modalId)}
          setModalId={setModalId}
        />
      )}
    </>
  )
}

export default PhotoStripAddress;