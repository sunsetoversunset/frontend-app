import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
// @ts-ignore
import { Viewer } from "react-iiif-viewer";
import { getNearbyAddresses } from "../utiliities";

import "../styles/PhotoViewerModalNew.scss";

import iconRightWhite from "../assets/icons/icon-right-bracket.svg"
import iconRightRust from "../assets/icons/icon-right-bracket-rust.svg"
import iconCloseWhite from "../assets/icons/icon-close-white.svg"
import iconLeftWhite from "../assets/icons/icon-left-bracket.svg"
import iconLeftRust from "../assets/icons/icon-left-bracket-rust.svg"

type Props = {
  id: string;
  nextId: string | undefined;
  previousId: string | undefined;
  x: number;
  setModalId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const PhotoViewerModal = (props: Props) => {
  const { id, nextId, previousId, x, setModalId } = props;
  const nearbyAddresses = getNearbyAddresses(x);

  const [isHoveringExpanded, setIsHoveringExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoveringCollapse, setIsHoveringCollapse] = useState(false);

  const handleArrowKeysPressed = ((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setModalId(previousId);
    }
    if (e.key === 'ArrowRight') {
      setModalId(nextId);
    }
  });

  useEffect(() => {
      window.addEventListener('keydown', handleArrowKeysPressed);
    return () => {
      window.removeEventListener('keydown', handleArrowKeysPressed);
    }
  });

  return (
    <div className='modal-backdrop'>
      <div className="modal-header">
        <div
          onClick={() => setModalId(undefined)}
          className='modal-close-icon'
        >
          <img src={iconCloseWhite} alt="icon-close-modal" />
        </div>
      </div>
      <Viewer iiifUrl={`https://media.getty.edu/iiif/image/${id}/info.json`} />
      <div className='photo-credits'>
        Year | © Ed Ruscha.{" "}
        <a href={`https://www.getty.edu/research/collections/lookup/imageUUID?id=${id}`} rel="noreferrer" target="_blank">
          View record at Getty Research Institute</a>
      </div>
      {(previousId) && (
        <img
          id='previousImage'
          src={`https://media.getty.edu/iiif/image/${previousId}/full/204,/0/default.jpg`}
          alt={id}
          onClick={() => { setModalId(previousId); }}
        />
      )}
      {(nextId) && (
        <img
          id='nextImage'
          src={`https://media.getty.edu/iiif/image/${nextId}/full/204,/0/default.jpg`}
          alt={id}
          onClick={() => { setModalId(nextId); }}
        />
      )}

      {(nearbyAddresses.length > 0) && (
        <div
          onMouseEnter={() => setIsHoveringExpand(true)}
          onMouseLeave={() => setIsHoveringExpand(false)}
          className={
            `nearby-addresses ${isExpanded ? 'expanded' : 'collapsed'}`
          }
        >
          <div
            className="nearby-addresses-label-container"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="nearby-addresses-label">
              Learn more about nearby addresses
            </span>
            {
              isExpanded === false ?
                isHoveringExpanded === true ?
                  <img src={iconRightRust} alt="icon-right-rust" /> :
                  <img src={iconRightWhite} alt="icon-right-white" />
                : null
            }
          </div>
          {
            isExpanded ?
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
          </ul> : null
          }
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