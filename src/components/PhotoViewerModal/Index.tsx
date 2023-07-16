import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// @ts-ignore
import { Viewer } from "react-iiif-viewer";
import { useAppContext } from "../../hooks";
import { getNearbyAddresses, getProximateAddressFromX, halfPhotoCoordinate } from "../../utiliities";

import iconCloseWhite from "../../assets/icons/icon-close-white.svg";
import iconLeftRust from "../../assets/icons/icon-left-bracket-rust.svg";
import iconLeftWhite from "../../assets/icons/icon-left-bracket.svg";
import iconAddress from "../../assets/icons/icon-address.svg";
import * as Styled from "./styled";
import * as Types from "./index.d";

const PhotoViewerModal = ({ id, setModalId }: Types.Props) => {
  const { pathname } = useLocation();
  const { setModalActive, width, media } = useAppContext();
  const [photoData, setPhotoData] = useState<Types.PhotoData>();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHoveringCollapse, setIsHoveringCollapse] = useState(false);

  const navImgWidth = Math.min(204, width / 5);

  const handleArrowKeysPressed = (e: KeyboardEvent) => {
    if (photoData?.previous_id && ((photoData?.side === "n" && e.key === "ArrowLeft") || (photoData?.side === "s" && e.key === "ArrowRight"))) {
      setModalId(photoData?.previous_id);
    }
    if (photoData?.next_id && ((photoData?.side === "n" && e.key === "ArrowRight") || (photoData?.side === "s" && e.key === "ArrowLeft"))) {
      setModalId(photoData?.next_id);
    }
  };

  useEffect(() => {
    axios.get(`/photos_data/${id.substring(0, 2)}.json`).then((response) => {
      const photoData = (response.data as Types.PhotoData[]).find((d) => d.id === id);
      setPhotoData(photoData);
    });
  }, [id]);

  useEffect(() => {
    window.addEventListener("keydown", handleArrowKeysPressed);
    return () => {
      window.removeEventListener("keydown", handleArrowKeysPressed);
    };
  });

  if (!photoData) {
    return null;
  }

  // the photo coordinates are from the edge; the addresses should be calculated from the center
  const photoCenterCoordinate = photoData.side === "n" ? photoData.coordinate + halfPhotoCoordinate : photoData.coordinate - halfPhotoCoordinate;
  const nearbyAddresses = getNearbyAddresses(photoCenterCoordinate, photoData.side, { excludeCrossStreets: true });
  // the close button goes to different urls depending on whether the page the modal is opend on is the panorama page or an address page
  const closeTos = {
    panorama: (() => {
      const addrOffset = getProximateAddressFromX("closest", photoCenterCoordinate, photoData.side, { direction: photoData.side, useCoordinateNotX: true });
      const pathpieces = pathname.split("/");
      return addrOffset ? [pathpieces[0], pathpieces[1], `${addrOffset.addr.replace(/\s+/g, "")}-${addrOffset.offset}`, pathpieces[3]].join("/") : pathname;
    })(),
    address: nearbyAddresses && nearbyAddresses.length >= 1 ? `../${nearbyAddresses[0]}` : pathname,
  };

  const leftId = photoData.side === "s" ? photoData.next_id : photoData.previous_id;
  const rightId = photoData.side === "s" ? photoData.previous_id : photoData.next_id;
  // the photo coordinates are the edge to the photo; addresses should be calculated from the center of it

  return (
    <Styled.Container className='modal'>
      <Styled.Modal>
        <Styled.Viewer>
          <Viewer iiifUrl={`https://media.getty.edu/iiif/image/${id}/info.json`} />
        </Styled.Viewer>
        <Styled.Close
          onClick={() => {
            setModalId(undefined);
            setModalActive(false);
          }}
        >
          <img src={iconCloseWhite} alt="icon-close-modal" />
        </Styled.Close>
        <Styled.Credits>
          {`${photoData.year} | © Ed Ruscha. `}
          <a href={`https://www.getty.edu/research/collections/lookup/imageUUID?id=${id}`} rel="noreferrer" target="_blank">
            View record at Getty Research Institute
          </a>
        </Styled.Credits>
        {leftId && (
          <Styled.PreviousImage
            src={`https://media.getty.edu/iiif/image/${leftId}/full/${navImgWidth},/0/default.jpg`}
            alt={id}
            onClick={() => {
              setModalId(leftId);
            }}
          />
        )}
        {rightId && (
          <Styled.NextImage
            src={`https://media.getty.edu/iiif/image/${rightId}/full/${navImgWidth},/0/default.jpg`}
            alt={id}
            onClick={() => {
              setModalId(rightId);
            }}
          />
        )}

        {nearbyAddresses.length > 0 && (
          <Styled.NearbyAddresses isExpanded={isExpanded}>
            <div onClick={() => setIsExpanded(!isExpanded)}>{isExpanded && media !== "phone" ? "Learn more about nearby addresses:" : <img src={iconAddress} alt="addresses" />}</div>
            {isExpanded && (
              <Styled.NearbyAddressesList>
                {nearbyAddresses.map((address) => {
                  return (
                    <li key={`nearby-address-${address}`}>
                      <Styled.AddressLink
                        to={`/address/${address.replace(/\s+/g, "")}/`}
                        onClick={() => {
                          setModalId(undefined);
                          setModalActive(false);
                        }}
                      >
                        <div>{address}</div>
                        <div>Sunset</div>
                      </Styled.AddressLink>
                    </li>
                  );
                })}
              </Styled.NearbyAddressesList>
            )}
            {isExpanded && <Styled.CollapseImg src={isHoveringCollapse ? iconLeftRust : iconLeftWhite} alt="collapse icon" onClick={() => setIsExpanded(false)} onMouseEnter={() => setIsHoveringCollapse(true)} onMouseLeave={() => setIsHoveringCollapse(false)} />}
          </Styled.NearbyAddresses>
        )}
      </Styled.Modal>
    </Styled.Container>
  );
};

export default PhotoViewerModal;
