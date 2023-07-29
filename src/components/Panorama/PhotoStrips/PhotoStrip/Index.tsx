import * as d3 from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppContext, usePhotoStrip } from "../../../../hooks";
import * as Styled from "./styled";

type Photo = {
  src: string;
  x: number;
  id: string;
  opacity?: number;
};

const PhotoStrip = ({ year }: { year: number }) => {
  const { photoData, direction, addressPhotoIds, scroll, leftX, farLeftX, farRightX } = usePhotoStrip(year);
  const { setModalActive, setModalId } = useAppContext();

  const [addressPhotoIdsString, setAddressPhotoIdsString] = useState(addressPhotoIds?.join(","));

  // determine which photos are visible when the xCoordinate changes or new photoData is loaded
  const visiblePhotos = useCallback(() => {
    const _addressPhotoIds = addressPhotoIdsString?.split(',');
    const imageWidth = 299;
    return photoData
      .filter((d) => d.x >= farLeftX - imageWidth && d.x <= farRightX + imageWidth)
      .map((d) => ({
        src: `https://media.getty.edu/iiif/image/${d.identifier}/full/,204/0/default.jpg`,
        x: d.x,
        id: d.identifier,
        opacity: !_addressPhotoIds || (_addressPhotoIds.length > 0 && _addressPhotoIds.includes(d.identifier)) ? 1 : 0.3,
      }));
  }, [photoData, addressPhotoIdsString, farLeftX, farRightX]);

  // the translateX value for the strip container
  const [translateX, setTranslateX] = useState(leftX * -1);
  // the photos that are visible for the visible part of the strip container
  const [photos, setPhotos] = useState<Photo[]>(visiblePhotos);


  // the div for the strip container
  const stripContainer = useRef(null);
  // keep track of the direction in order to test whether it's changed
  const directionRef = useRef(direction);

  // if the addressPhotoIds changes, update the state value, which is stored as a string
  useEffect(() => {
    if (addressPhotoIds && addressPhotoIds.join(',') !== addressPhotoIdsString) {
      setAddressPhotoIdsString(addressPhotoIds.join(','));
    }
  }, [addressPhotoIds, addressPhotoIdsString]);

  // update the photos when new ones are loaded
  useEffect(() => {
    setPhotos(visiblePhotos);
  }, [visiblePhotos]);

  // when the direction changes, set t
  useEffect(() => {
    if (direction !== directionRef.current) {
      directionRef.current = direction;
      setTranslateX(leftX * -1);
    }
  }, [direction, leftX]);

  // scroll the strip if the center has changed (and the direction hasn't)
  useEffect(() => {
    d3.select(stripContainer.current)
      .transition()
      // only animate if scroll is set to true
      // it's set to false by a flag in the url to skip any animation if the strip is dragged rather than moved when the user hits the west or east buttons
      .duration(scroll ? 1500 : 0)
      .style("transform", `translateX(${leftX * -1}px)`)
      .on("end", () => {
        // updated the state/ref values to reflect the post-scroll values
        // todo: This was causing a glitch where the whole app seemed to rerender and caused a quick flash.
        setTranslateX(leftX * -1);
      });
  }, [leftX, scroll]);


  if (photos.length === 0) {
    return <div style={{ textAlign: "center", margin: "5px 0", height: 40 }}>{`There are no photos for this location for ${year}`}</div>;
  }

  return (
    <>
      <Styled.Strip width={farRightX - farLeftX}>
        <Styled.Photos ref={stripContainer} width={farRightX - farLeftX} translateX={translateX}>
          {photos.map((photo) => (
            <img
              src={photo.src}
              style={{
                transform: `translateX(${photo.x}px)`,
                opacity: photo.opacity,
              }}
              key={photo.src}
              onDoubleClick={() => {
                setModalId(photo.id);
                setModalActive(true);
              }}
              draggable={false}
              // TODO: this alt tag is meaningless--is there something that can be added?
              alt={`${photo.src}`}
            />
          ))}
        </Styled.Photos>
        {/* <Styled.Year>{year}</Styled.Year> */}
      </Styled.Strip>

    </>
  );
};

export default PhotoStrip;
