import * as d3 from 'd3';
import { useEffect, useRef, useState } from "react";
import { useAppContext, usePhotoStrip } from '../../../hooks';
import PhotoViewerModal from "../../PhotoViewerModal/Index";
import * as Styled from './styled';

type Photo = {
  src: string;
  x: number;
  id: string;
  opacity?: number;
}

const PhotoStrip = ({ year }: { year: number; }) => {
  const { leftX, rightX, photoData, direction, directionLoaded, addressPhotoIds } = usePhotoStrip(year);
  const { setModalActive } = useAppContext();

  // scrolling: whether it's scrolling with an animation
  const [scrolling, setScrolling] = useState(false);
  // the translateX value for the strip container
  const [translateX, setTranslateX] = useState(leftX * -1);
  // the photos that are visible for the visible part of the strip container
  const [photos, setPhotos] = useState<Photo[]>([]);
  // the if for the image that is displayed in the modal. Undefined is unopened
  const [modalId, setModalId] = useState<string>();

  // refs to track the previous leftX and rightX, which are used to retrieve and display both the last and the next photos during a scroll
  const leftXRef = useRef(leftX);
  const rightXRef = useRef(rightX);
  // track the addressPhotoIdsToo 
  const addressPhotoIdsRef = useRef(addressPhotoIds?.join(','));
  // the div for the strip container
  const stripContainer = useRef(null);
  const directionRef = useRef(direction);
  const [load, setLoad] = useState(true);

  const imageWidth = 299;

  const getVisiblePhotosInRange = (left: number, right: number) => {
    return photoData
      .filter(d => d.x >= left - imageWidth && d.x <= right + imageWidth)
      .map(d => ({
        src: `https://media.getty.edu/iiif/image/${d.identifier}/full/,204/0/default.jpg`,
        x: d.x,
        id: d.identifier,
        opacity: (!addressPhotoIds || (addressPhotoIds.length > 0 && addressPhotoIds.includes(d.identifier))) ? 1 : 0.3,
      }));
  };

  // load the visible photos and immediately set the translateX without any animation
  // this happens on initialization and on a change of the direction
  // the conditions with the photoData are needed to test that the photo data has been set or reset
  useEffect(() => {
    if (load && directionLoaded !== directionRef.current) {
      directionRef.current = directionLoaded;
      setPhotos(getVisiblePhotosInRange(leftX, rightX));
      setTranslateX(leftX * -1)
      setLoad(false);
    }
  });

  //set the photos when adddressDataIds are updated
  useEffect(() => {
    if (addressPhotoIds && addressPhotoIds.length > 0 && addressPhotoIds.join(',') !== addressPhotoIdsRef.current) {
      addressPhotoIdsRef.current = addressPhotoIds.join(',');
      setPhotos(getVisiblePhotosInRange(leftX, rightX));
    }
  }, [addressPhotoIds]);


  // set the photos if the photoData--stemming from the direction--has changed
  useEffect(() => {
    if (directionRef.current !== direction) {
      setLoad(true);
    }
  }, [direction]);

  // set the photos on initial load or when the newCenter changes
  useEffect(() => {
    if (directionRef.current === direction) {
      // get the photoset that will be visible after scrolling 
      // only retrieve new photos if the distance is 3000px or less
      const photosForScroll = (Math.abs(leftX * -1 - translateX) < 3000)
        ? getVisiblePhotosInRange(Math.min(leftX, leftXRef.current), Math.max(rightX, rightXRef.current))
        : getVisiblePhotosInRange(leftX, rightX);
      setPhotos(photosForScroll);
      if (translateX !== leftX * -1) {
        setScrolling(true);
      }
    }
  }, [leftX, rightX]);

  // scroll the bar when after new photos have been loaded
  useEffect(() => {
    if (scrolling) {
      // only run the transition if the distance is less than 3000 pixels
      d3.select(stripContainer.current)
        .transition()
        .duration(1500)
        .style('transform', `translateX(${leftX * -1}px)`)
        .on('end', () => {
          // updated the state/ref values to reflect the post-scroll values
          leftXRef.current = leftX;
          rightXRef.current = rightX;
          setTranslateX(leftX * -1);
          // set the photos to remove those now off the canvas
          setPhotos(getVisiblePhotosInRange(leftX, rightX));
          setScrolling(false);
        });
    }
  });

  if (photos.length === 0) {
    return (
      <div style={{ textAlign: 'center', margin: '5px 0' }}>
        {`There are no photos for this location for ${year}`}
      </div>
    );
  }

  let startDragX: number;
  const handleDragStart = (e: any) => {
    startDragX = e.clientX;
  }

  function handleDrag(e: any) {
    console.log("Dragging...");
    console.log({ startDragX, distance: startDragX - e.clientX });
  }

  return (
    <>
      <Styled.Strip>
        <Styled.Photos
          ref={stripContainer}
          width={rightX - leftX}
          translateX={translateX}
          draggable={true}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
        >
          {photos.map(photo => (
            <img
              src={photo.src}
              style={{
                transform: `translateX(${photo.x}px)`,
                opacity: photo.opacity,
              }}
              key={photo.src}
              onClick={() => {
                setModalId(photo.id);
                setModalActive(true);
              }}
              // TODO: this alt tag is meaningless--is there something that can be added?
              alt={`${photo.src}`}
            />
          ))}
        </Styled.Photos>
      <Styled.Year>{year}</Styled.Year>
      </Styled.Strip>
      {(modalId) && (
        <PhotoViewerModal
          id={modalId}
          setModalId={setModalId}
        />
      )}
    </>
  )
}

export default PhotoStrip;