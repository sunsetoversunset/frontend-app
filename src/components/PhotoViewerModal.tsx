import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// @ts-ignore
import { Viewer } from "react-iiif-viewer";
import { getNearbyAddresses, halfPhotoCoordinate, getProximateAddressFromX } from "../utiliities";
import { useAppContext } from "../hooks";

import "../styles/PhotoViewerModalNew.scss";
import iconCloseWhite from "../assets/icons/icon-close-white.svg"
import iconLeftWhite from "../assets/icons/icon-left-bracket.svg"
import iconLeftRust from "../assets/icons/icon-left-bracket-rust.svg"

const StyledAddressLink = styled(Link)`
  text-align: center;
  font-family: "Sunset-Gothic";
  font-weight: 300;
  color: #000000;
  position: relative;

    &:hover::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #000000;
    }
    &,
    &:active,
    &:visited {
        text-decoration: none;
    }

  
  div:nth-child(2) {
    font-size: 0.6em;
    text-transform: uppercase;
  }

`;

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
  const { setModalActive } = useAppContext();
  const [photoData, setPhotoData] = useState<PhotoData>();
  const [isExpanded, setIsExpanded] = useState(true);
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

  // the photo coordinates are from the edge; the addresses should be calculated from the center
  const photoCenterCoordinate = (photoData.side === 'n') ? photoData.coordinate + halfPhotoCoordinate : photoData.coordinate - halfPhotoCoordinate;
  const nearbyAddresses = getNearbyAddresses(photoCenterCoordinate, photoData.side, { excludeCrossStreets: true });
  // the close button goes to different urls depending on whether the page the modal is opend on is the panorama page or an address page
  const closeTos = {
    panorama: (() => {
      const addrOffset = getProximateAddressFromX('closest', photoCenterCoordinate, photoData.side, { useCoordinateNotX: true });
      const pathpieces = pathname.split('/');
      return (addrOffset) ? [pathpieces[0], pathpieces[1],`${addrOffset.addr.replace(/\s+/g, '')}-${addrOffset.offset}`, pathpieces[3]].join('/') : pathname;
    })(),
    address: (nearbyAddresses && nearbyAddresses.length >= 1) ? `../${nearbyAddresses[0]}` : pathname,
  };

  const leftId = (photoData.side === 's') ? photoData.next_id : photoData.previous_id;
  const rightId = (photoData.side === 's') ? photoData.previous_id : photoData.next_id;
  // the photo coordinates are the edge to the photo; addresses should be calculated from the center of it


  return (
    <div className='modal-backdrop'>
      <div className="modal-header">
        <div
          onClick={() => {
            setModalId(undefined);
            setModalActive(false);
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
            >
            <span
              className="nearby-addresses-label"
              onClick={() => setIsExpanded(!isExpanded)}
            >
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
          {(isExpanded && nearbyAddresses) && (
              <ul className="nearby-addresses-list">
                {nearbyAddresses.map((address) => {
                  return (
                    <li key={`nearby-address-${address}`}>
                      <StyledAddressLink
                        to={`/address/${address.replace(/\s+/g, '')}/`}
                        onClick={() => {
                          setModalId(undefined);
                          setModalActive(false);
                        }}
                      >
                        <div>{address}</div>
                        <div>Sunset</div>
                      </StyledAddressLink>
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