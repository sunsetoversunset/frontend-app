import { useRef, useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import * as d3 from 'd3'
import "../../styles/PhotoStrip.scss";
import PhotoViewerModal from "../PhotoViewerModal";
import { DimensionsContext } from '../../Contexts';
import { Dimensions } from "../../index.d";
import { URLParamsPanorama, PhotoData } from './index.d';
import { getOppositeX, mult, addrOffsetToCoordinate } from '../../utiliities';

type Photo = {
  src: string;
  x: number;
  id: string;
}

const PhotoStrip = ({ year }: { year: number; }) => {
  const { width } = (useContext(DimensionsContext) as Dimensions);
  // `newCenter` is x coordinate centered in the strip. By default, it's half the width of the screen to position the leftmost photos left
  const { addrOffset, direction } = useParams<URLParamsPanorama>();
  const newCenter = addrOffsetToCoordinate(addrOffset as string);
  const stripContainer = useRef(null)
  const imageWidth = 299;
  const [center, setCenter] = useState(newCenter);
  const [scrolling, setScrolling] = useState(false);
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalId, setModalId] = useState<string>();
  const currentDirection = useRef(direction);

  const getVisiblePhotosInRange = (left: number, right: number) => {
    return photoData
      .filter(d => d.x >= left - imageWidth && d.x <= right + imageWidth)
      .map(d => ({
        src: `https://media.getty.edu/iiif/image/${d.identifier}/full/,204/0/default.jpg`,
        x: d.x,
        id: d.identifier,
      }))
      .sort((a, b) => b.x - a.x);
    //.sort((a, b) => Math.abs(center - b.x - imageWidth / 2) - Math.abs(center - a.x - imageWidth / 2));
    //.sort((a, b) => Math.abs(center - a.x - imageWidth / 2) - Math.abs(center - b.x - imageWidth / 2));
  }

  /* retrive the photos coordinates on initial load */
  useEffect(() => {
    //d3.csv(`https://raw.githubusercontent.com/sunsetoversunset/frontend-app/main/src/assets/data/photographs_${year}_${direction}.csv?token=GHSAT0AAAAAABUS6E6HWHN4EFKDW4VGHYQOYUBMD4A`)
    d3.csv(`/data/photographs_${year}_${direction}.csv`)
      .then(d => {
        const _d = d as any;
        if (currentDirection.current !== direction) {
          currentDirection.current = direction;
          setCenter(newCenter)
        }

        setPhotoData(_d
          .map((row: any) => ({
            ...row,
            x: (direction === 'n') ? parseFloat(row.coordinate) * mult : getOppositeX(parseFloat(row.coordinate) * mult),
            facing: direction,
            year,
          }))
          .sort((a: any, b: any) => a.x - b.x)
        );
      });
  }, [direction, year]);

  // set the photos if the photoData--stemming from the direction--has changed
  useEffect(() => {
    setPhotos(getVisiblePhotosInRange(center - width / 2, center + width / 2));
  }, [photoData]);

  // set the photos on initial load or when the newCenter changes
  useEffect(() => {
    if (currentDirection.current === direction) {
      const left = (newCenter < center) ? newCenter - width / 2 : center - width / 2;
      const right = (newCenter < center) ? center + width / 2 : newCenter + width / 2;

      // get the photoset that will be visible after scrolling 
      const photosForScroll = getVisiblePhotosInRange(left, right);
      setPhotos(photosForScroll);
      if (newCenter !== center) {
        setScrolling(true);
      }
    }
  }, [newCenter]);

  // scroll the bar when after new photos have been loaded
  useEffect(() => {
    if (scrolling) {
      d3.select(stripContainer.current)
        .transition()
        // TODO: should this be variable depending on the distance scrolled to?
        .duration(1500)
        .style('transform', `translateX(-${newCenter - width / 2}px)`)
        .on('end', () => {
          setCenter(newCenter);
          // set the photos to remove those now off the canvas
          setPhotos(getVisiblePhotosInRange(newCenter - width / 2, newCenter + width / 2));
          setScrolling(false);
        });
    }
  });

  const getNextId = (id: string) => {
    const thePhoto = photoData.find(photo => photo.identifier === id);
    if (thePhoto) {
      const photosAbove = photoData
        .filter(photo => photo.x > thePhoto.x)
        .sort((a, b) => a.x - b.x)
      return (photosAbove.length > 0) ? photosAbove[0].identifier : undefined
    }
    return undefined;
  }

  const getPreviousId = (id: string) => {
    const thePhoto = photoData.find(photo => photo.identifier === id);
    if (thePhoto) {
      const photosBelow = photoData
        .filter(photo => photo.x < thePhoto.x)
        .sort((a, b) => b.x - a.x)
      return (photosBelow.length > 0) ? photosBelow[0].identifier : undefined
    }
    return undefined;
  }

  return (
    <>
      <div className={`strip-container strip-${year}-${direction}`}>
        <div
          className={`strip-photos-container year-${year}`}
          ref={stripContainer}
          style={{
            width: width,
            transform: `translateX(-${center - width / 2}px)`,
          }}
        >
          {photos.map(photo => (
            <img
              src={photo.src}
              style={{
                transform: `translateX(${photo.x}px)`,
              }}
              key={photo.src}
              onClick={() => {
                setModalId(photo.id);
              }}
              // TODO: this alt tag is meaningless--is there something that can be added?
              alt={`${photo.src}`}
            />
          ))}
        </div>
      </div>
      <div className={`strip-year-label-outer-container`}>
        <div className="strip-year-label-inner-container">
          <span className="strip-year-label">{year}</span>
        </div>
      </div>
      <div className={`strip-divider  year-${year}`}></div>
      {(modalId) && (
        <PhotoViewerModal
          id={modalId}
          previousId={getPreviousId(modalId)}
          nextId={getNextId(modalId)}
          setModalId={setModalId}
        />
      )}
    </>
  )
}

export default PhotoStrip;