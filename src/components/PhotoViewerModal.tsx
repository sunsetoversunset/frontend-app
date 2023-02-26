import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// @ts-ignore
import { Viewer } from "react-iiif-viewer";
import { getNearbyAddresses,coordinateToAddress } from "../utiliities";

import "../styles/PhotoViewerModalNew.scss";

// import iconRightWhite from "../assets/icons/icon-right-bracket.svg"
// import iconRightRust from "../assets/icons/icon-right-bracket-rust.svg"
import iconCloseWhite from "../assets/icons/icon-close-white.svg"
import iconLeftWhite from "../assets/icons/icon-left-bracket.svg"
import iconLeftRust from "../assets/icons/icon-left-bracket-rust.svg"

type Props = {
  id: string;
  setModalId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type PhotoData = {
  id: string;
  next_id: string | undefined;
  previous_id: string | undefined;
  side: 'n' | 's';
  year: number;
  coordinate: number;
}

const PhotoViewerModal = ({ id, setModalId }: Props) => {
  const { pathname } = useLocation();
  let pageType: 'panorama' | 'address' | 'story' = 'panorama';
  if (pathname.startsWith('/address/')) {
    pageType = 'address';
  }
  if (pathname.startsWith('/stories/')) {
    pageType = 'story';
  }
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState<PhotoData>();
  const nearbyAddresses = (photoData) ? getNearbyAddresses(photoData.coordinate, photoData.side, { excludeCrossStreets: true }) : [];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoveringCollapse, setIsHoveringCollapse] = useState(false);

  const handleArrowKeysPressed = ((e: KeyboardEvent) => {
    if (photoData?.previous_id && ((photoData?.side === 'n' && e.key === 'ArrowLeft') || (photoData?.side === 's' && e.key === 'ArrowRight'))) {
      setModalId(photoData?.previous_id);
    }
    if (photoData?.next_id && ((photoData?.side === 'n' && e.key === 'ArrowRight') || (photoData?.side === 's' && e.key === 'ArrowLeft'))) {
      setModalId(photoData?.next_id);
    }
  });

  useEffect(() => {
    axios.get(`/photos_data/${id.substring(0, 2)}.json`)
      .then(response => {
        const photoData = (response.data as PhotoData[]).find(d => d.id === id);
        setPhotoData(photoData);
      })
  }, [id]);

  useEffect(() => {
      window.addEventListener('keydown', handleArrowKeysPressed);
    return () => {
      window.removeEventListener('keydown', handleArrowKeysPressed);
    }
  });

  if (!photoData) {
    return null;
  }

  console.log(photoData.coordinate);
  const closeTos = {
    panorama: (() => {
      const addrOffset = coordinateToAddress(photoData.coordinate, photoData.side);
      const pathpieces = pathname.split('/');
      return (addrOffset) ? [pathpieces[0], pathpieces[1],`${addrOffset.addr.replace(/\s+/g, '')}-${addrOffset.offset}`, pathpieces[3]].join('/') : pathname;
    })(),
    address: (nearbyAddresses && nearbyAddresses.length >= 1) ? `../${nearbyAddresses[0]}` : pathname,
  };

  const leftId = (photoData.side === 's') ? photoData.next_id : photoData.previous_id;
  const rightId = (photoData.side === 's') ? photoData.previous_id : photoData.next_id;

  return (
    <div className='modal-backdrop'>
      <div className="modal-header">
        <div
          onClick={() => {
            setModalId(undefined);
            if (pageType === 'panorama' || pageType === 'address') {
              navigate(closeTos[pageType]);
            }
          }}
          className='modal-close-icon'
        >
          <img src={iconCloseWhite} alt="icon-close-modal" />
        </div>
      </div>
      <Viewer iiifUrl={`https://media.getty.edu/iiif/image/${id}/info.json`} />
      <div className='photo-credits'>
        {`${photoData.year} | © Ed Ruscha. `}
        <a href={`https://www.getty.edu/research/collections/lookup/imageUUID?id=${id}`} rel="noreferrer" target="_blank">
          View record at Getty Research Institute</a>
      </div>
      {(leftId) && (
        <img
          id='previousImage'
          src={`https://media.getty.edu/iiif/image/${leftId}/full/204,/0/default.jpg`}
          alt={id}
          onClick={() => { setModalId(leftId); }}
        />
      )}
      {(rightId) && (
        <img
          id='nextImage'
          src={`https://media.getty.edu/iiif/image/${rightId}/full/204,/0/default.jpg`}
          alt={id}
          onClick={() => { setModalId(rightId); }}
        />
      )}

      {(nearbyAddresses.length > 0) && (
        <div
          // onMouseEnter={() => setIsHoveringExpand(true)}
          // onMouseLeave={() => setIsHoveringExpand(false)}
          className={
            `nearby-addresses ${isExpanded ? 'expanded' : 'collapsed'}`
          }
        >
          <div
            className="nearby-addresses-label-container"
            //onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="nearby-addresses-label">
              Learn more about nearby addresses:
            </span>
            {/* {
              isExpanded === false ?
                isHoveringExpanded === true ?
                  <img src={iconRightRust} alt="icon-right-rust" /> :
                  <img src={iconRightWhite} alt="icon-right-white" />
                : null
            } */}
          </div>
          {(nearbyAddresses) && (
              <ul className="nearby-addresses-list">
                {nearbyAddresses.map((address) => {
                  return (
                    <li key={`nearby-address-${address}`}>
                      <Link
                        className="nearby-address-link"
                        to={`/address/${address.replace(/\s+/g, '')}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {`${address} Sunset Blvd.`}
                      </Link>
                    </li>
                  )
              })}
            </ul>
          )}
          {
            isExpanded ?
              <div
                className="icon-collapse-nearby"
                onClick={() => setIsExpanded(false)}
                onMouseEnter={() => setIsHoveringCollapse(true)}
                onMouseLeave={() => setIsHoveringCollapse(false)}
              >
                {
                  isHoveringCollapse === false ?
                    <img src={iconLeftWhite} alt="icon-left-white" /> :
                    <img src={iconLeftRust} alt="icon-left-rust" />
                }

              </div> : null
          }
        </div>
      )}
    </div>
  );
}

export default PhotoViewerModal;