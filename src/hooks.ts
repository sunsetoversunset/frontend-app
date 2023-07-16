import { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { AddressDataContext, AppContext, PanoramaContext } from './Contexts';
import { mult, getOppositeX, labels, getProximateAddress, getLabelFromAddress, easternLongitudes, parseAddrOffset, latLngToXY, maxXs } from './utiliities';
import type { AddressDataAndNavData, PanoramaData } from './types/hooks.d';
import type { URLParamsPanorama } from './components/Panorama/index.d';
import type { Direction, StoryMetadata, YearStr } from './index.d';
import type { PhotoData } from './components/Panorama/index.d';
import { AddressData } from './types/AddressView';
import GeoJson from './assets/data/sunset.json';

export function useAddressDataContext() {
  return useContext(AddressDataContext);
}

export function useAppContext() {
  return useContext(AppContext);
}

/** 
 * Used by the address view components, it retrieves the address data asyncronously from the json file
 * @returns
 *  {
 *    addressHasData: boolean;                
 *    address: string;                         // the address
 *    previousAddress: string | undefined;     // the previousAddress if there is one
 *    nextAddress: string | undefined;         // the nextAddress if there is one
 *    addressData: AddressData | undefined;    // the data for the address 
 *  }
 * 
 * The addressData is:
 *  {
 *    side: 'n' | 's';                         // the direction
 *    boundaries: [number, number];            // the x values defining the boundaries of the address in space
 *    photos: Photo[];                         // photos within those boundaries
 *    census_data: CensusData;                 // the data for the following tables--full types in AddressView.d.ts
 *    occupants_data: Occupants_Data[];
 *    newspaper_data: NewspaperArticle[];
 *    social_cultural_data: SocialCulturalInformation[];
 *    assessor_data: AssessorRow[];
 *  }
 */
export function useAddressData(): AddressDataAndNavData {
  const { address } = useParams() as { address: string };
  const [addressData, setAddressData] = useState<AddressData>();
  const [addressHasData, setAddressHasData] = useState(true);
  const direction = (parseInt(address) % 2 === 0) ? 's' : 'n';

  useEffect(() => {
    if (address) {
      const cancelToken = axios.CancelToken;
      const source = cancelToken.source();
      axios.get(`/address_data/${address}.json`)
        .then(response => {
          setAddressData(response.data as AddressData);
        })
        .catch((reason: AxiosError) => {
          setAddressHasData(false);
        });
      return () => { source.cancel(); }
    }
  }, [address]);

  let previousAddress = (addressData && address) ? getProximateAddress('previous', address, direction, { direction: addressData.side, excludeCrossStreets: true, excludeAddressesWithoutBoundaries: true }) : undefined;
  let nextAddress = (addressData && address) ? getProximateAddress('next', address, direction, { direction: addressData.side, excludeCrossStreets: true, excludeAddressesWithoutBoundaries: true }) : undefined;
  let oppositeAddress = (addressData && address) ? getProximateAddress('closest', address, direction, { direction: (addressData.side === 'n') ? 's' : 'n', excludeCrossStreets: true, excludeAddressesWithoutBoundaries: true }) : undefined;

  return {
    address,
    addressData,
    addressHasData,
    previousAddress,
    nextAddress,
    oppositeAddress,
  };
}

/*
 * Calculates and returns the basic data for the panorama view, calculated from the view window with and the address from the URL. Returns:
 *  {
 *    isIvalidAddress: boolean;                // 
 *    address: string;                         // the address
 *    offset: number;                          // the distance between the address and the center of the view window in pixels
 *    direction: Direction;                    // the direction being viewed
 *    yearsStr: string;                        // the years being shown from the URL separated by commas
 *    years: number[];                         // the years
 *    x: number;                               // the center of the view window
 *    leftX: number;                           // the left value of the view window
 *    rightX: number;                          // the right value of the view window
 *    minLeftX: number;                        // the minimum left value possible given the selected years, used to disable the move left button
 *    maxRightX: number;                       // the maximum right value possible given the selected years, used toe disable the move right button
 *    width: number;                           // the width of the window
 *    coordinate: number;                      // the coordinate center before the multiplier is applied--i.e. what the number would be using the photos coordinates
 *    percentAlongPath: number;                // the percent the x value is along the road path
 *    lat: number;                             // the latitude corresponding to x
 *    lng: number;                             // the longitude corresponding to x
 *    mapX: number;                            // the x coordinate for the selected location on the map
 *    mapY: number;                            // the y coordinate for the selected location on the map
 *    rotation: number;                        // the rotation of the marker on the map
 *    visibleAddresses: StripLabel[],          // the addresses the are visibile with the view bounds
 *    scrollDistance,                          // the selected distance as a percent if the view bounds the user scrolls when going left or right
 *    scrollDistanceX,                         // the selected distance the users scrolls when going left or right
 *    setScrollDistance: React.Dispatch<React.SetStateAction<number>>
 *                                             // the function to set the scroll distance
 *    scroll: boolean,                         // whether to scroll or not, allowing the animation to be ignored
 * }
 */
export function usePanoramaData(): PanoramaData {
  const { width } = useAppContext();
  const mapWidth = width * 0.9;
  const mapHeight = Math.min(200, width / 3);
  
  const { scrollDistance, setScrollDistance } = useContext(PanoramaContext);
  const { direction, years: yearsStr, addrOffset } = useParams() as URLParamsPanorama;
  const { addr: address, offset, scroll } = parseAddrOffset(addrOffset, direction);
  const { x: addressX, coordinate, lat, lng, percentAlongPath, rotation } = getLabelFromAddress(address, direction);
  const [mapX, mapY] = latLngToXY([lat, lng], mapWidth, mapHeight);

  const years: YearStr[] = yearsStr.split(',').map(d => d as YearStr);
  const x = addressX + offset;
  const leftX = Math.floor(x - width / 2);
  const rightX = Math.ceil(x + width / 2);
  const farLeftX = Math.floor(leftX - width);
  const farRightX = Math.ceil(rightX + width);
  const maxX = (direction === 'n')
    ? Math.max(...years.map(year => maxXs[year])) - width / 2
    : getOppositeX(width / 2);
  const minX = (direction === 'n')
    ? width / 2
    : getOppositeX(Math.max(...years.map(year => maxXs[year])) );
  const visibleAddresses = labels.filter(d => d.direction === direction && d.x >= farLeftX && d.x <= farRightX + width);

  const easternmostLongitude = Math.max(...years.map(year => easternLongitudes[year]))
  return {
    address,
    offset,
    direction,
    yearsStr,
    years: years.map(d => parseInt(d)),
    x,
    leftX,
    rightX,
    farLeftX,
    farRightX,
    minX: Math.ceil(minX),
    maxX: Math.floor(maxX),
    width,
    coordinate,
    percentAlongPath,
    lat,
    lng,
    easternmostLongitude,
    mapX,
    mapY,
    visibleAddresses,
    rotation,
    scrollDistance,
    scrollDistanceX: scrollDistance * width,
    setScrollDistance,
    scroll,
  };
}

/* 
  Returns addresses for the map to place them on the canvas
*/
export function useAddresses(direction?: Direction) {
  const { width } = useAppContext();
  const { easternmostLongitude } = usePanoramaData();
  const mapWidth = width * 0.9;
  const mapHeight = Math.min(200, width / 3);
  return labels
    .filter(d => !direction || direction === d.direction)
    .filter(d => !easternmostLongitude || d.lng <= easternmostLongitude)
    .map(d => {
      const [mapX, mapY] = latLngToXY([d.lat, d.lng], mapWidth, mapHeight);
      return {
        ...d,
        mapX,
        mapY,
      };
    });
}

export function usePhotoStrip(year: number) {
  const { width } = useAppContext();
  let { addrOffset, direction, address } = useParams<Partial<URLParamsPanorama> & { address?: string }>();
  const addressData = useAddressData();
  const pageType = (address) ? 'addressView' : 'panorama';
  const widthMultiplier = (pageType === 'panorama') ? 1 : 3.25;
  let offset = 0;
  let scroll = true;
  if (pageType === 'panorama') {
    const addressAndOffset = parseAddrOffset(addrOffset as string, direction as Direction);
    address = addressAndOffset.addr;
    offset = addressAndOffset.offset;
    scroll = addressAndOffset.scroll;
  }
  if (pageType === 'addressView') {
    direction = (parseInt(address as string) % 2 === 0) ? 's' : 'n';
  }

  const directionRef = useRef(direction);
  // x coordinate centered in the strip. By default, it's half the width of the screen to position the leftmost photos left
  // it is set as state so it can be tied to the photo data and not updated until the photo data has been loaded if necessary
  const [x, setX] = useState(Math.round((getLabelFromAddress(address as string, direction as Direction).x + offset) * widthMultiplier));
  const yearRef = useRef(year);
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);

  // set a variable to store what direction the most recent data was loaded for, used to trigger the retrieval of the visible photos when the data has finished loaded
  const [directionLoaded, setDirectionsLoaded] = useState<Direction | undefined>()
  //const [boundaries, setBoundaries] = useState<[number, number]>();

  useEffect(() => {
    /* retrive the photos coordinates on initial load or a change of direction */
    if (photoData.length === 0 || direction !== directionRef.current || year !== yearRef.current) {
      const cancelToken = axios.CancelToken;
      const source = cancelToken.source();
      axios.get(`/data/photographs_${year}_${direction}.json`)
        .then(response => {
          setPhotoData((response.data as any)
            // at the moment there are some issues with the 1966 images where those above id 371 are misplaced relative to the other images
            //.filter((row: any) => year !== 1966 || row.id < 371 || row.coordinate >= 156.58693)
            .map((row: any) => ({
              identifier: row.identifier,
              x: (direction === 'n') ? parseFloat(row.coordinate) * mult * widthMultiplier : getOppositeX(parseFloat(row.coordinate) * mult) * widthMultiplier,
              facing: direction,
              year,
            })));
          //.sort((a: any, b: any) => a.x - b.x));
          setDirectionsLoaded(direction);
          directionRef.current = direction;
          setX(Math.round((getLabelFromAddress(address as string, direction as Direction).x + offset)));
          yearRef.current = year;
        });
      return () => { source.cancel(); }
    } else {
      setX(Math.round((getLabelFromAddress(address as string, direction as Direction).x + offset) * widthMultiplier));
    } 
  }, [direction, year, widthMultiplier, x, address, offset]);

  return {
    photoData,
    directionLoaded,
    address,
    x,
    leftX: Math.floor(x - width / 2),
    rightX: Math.ceil(x + width / 2),
    farLeftX: Math.floor(x - width * 1.5),
    farRightX: Math.ceil(x + width * 1.5),
    direction: directionRef.current,
    widthMultiplier,
    addressPhotoIds: addressData?.addressData?.photos?.map(photo => photo.id),
    scroll,
    //boundaries,
  }
}

/*
 * Returns two svg paths for Sunset for the map--one the complete path, the other the path just for
 * the area with visible photos for selected years.
*/
export function useRoadPath() {
  const { width, easternmostLongitude } = usePanoramaData();
  const mapWidth = width * 0.9;
  const mapHeight = Math.min(200, width / 3);

  const pointsWithPhotos = GeoJson.geometry.coordinates[0].filter(point => point[0] <= easternmostLongitude);
  const [firstXActive, firstYActive] = latLngToXY([pointsWithPhotos[0][1], pointsWithPhotos[0][0]], mapWidth, mapHeight);
  const lineSegmentsActive = pointsWithPhotos
    .slice(1)
    .map((point) => {
      const [x, y] = latLngToXY([point[1], point[0]], mapWidth, mapHeight)
      return `L ${x} ${y}`;
    });

  const allPoints = GeoJson.geometry.coordinates[0];
  const [firstX, firstY] = latLngToXY([allPoints[0][1], allPoints[0][0]], mapWidth, mapHeight);
  const lineSegmentsAll = allPoints
    .slice(1)
    .map((point) => {
      const [x, y] = latLngToXY([point[1], point[0]], mapWidth, mapHeight)
      return `L ${x} ${y}`;
    });

  return {
    activePath: `M ${firstXActive} ${firstYActive} ${lineSegmentsActive.join(" ")}`,
    completePath: `M ${firstX} ${firstY} ${lineSegmentsAll.join(" ")}`,
  }
}

/*
 * returns true or false if the address in the url is valid--used for the panorama to prevent the page from returning nothing
*/
export function useIsValidAddress() {
  let { addrOffset, address, direction } = useParams<Partial<URLParamsPanorama> & { address?: string, direction?: Direction }>();
  if (addrOffset && direction) {
    const addressAndOffset = parseAddrOffset(addrOffset, direction);
    address = addressAndOffset.addr;
  }
  return typeof labels.find(label => label.label.replace(/\s+/g, '') === address) !== 'undefined';
}

export function useStoriesMetadata() {
  const [storiesMetadata, setStoriesMetadata] = useState<StoryMetadata[]>([]);
  
  useEffect(() => {
    axios.get(`/storiesassets/stories.json`)
      .then(response => {
        setStoriesMetadata((response.data as StoryMetadata[])
          .filter(d => d.published)
          .sort((a, b) => b.date.year * 10000 + b.date.month * 100 + b.date.day - a.date.year * 10000 + a.date.month * 100 + a.date.day)
        );
      });
  }, []);
  return storiesMetadata;
}

export function useStoriesFeaturingAddress(address: string) {
  const storiesMetadata = useStoriesMetadata();
  console.log(storiesMetadata);
  return storiesMetadata.filter(d => d.addresses && d.addresses.map(_d => (typeof _d === 'number') ? _d.toString() : _d).includes(address));
}