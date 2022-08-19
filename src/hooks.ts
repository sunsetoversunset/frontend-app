import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { AddressDataContext, AppContext, PanoramaContext } from './Contexts';
import { mult, getOppositeX, labels, getPreviousAddress, getNextAddress, getAddressX, parseAddrOffset, latLngToXY } from './utiliities';
import type { URLParamsPanorama } from './components/Panorama/index.d';
import type { StripLabel, Direction } from './index.d';
import type { PhotoData } from './components/Panorama/index.d';
import { AddressData } from './types/AddressView';

export function useAddressDataContext() {
  return useContext(AddressDataContext);
}

export function useAppContext() {
  return useContext(AppContext);
}

export function useAddressData() {
  const { address } = useParams() as { address: string };
  const [addressData, setAddressData] = useState<AddressData>();
  const [addressHasData, setAddressHasData] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    axios.get(`/address_data/${address}.json`)
      .then(response => {
        setAddressData(response.data as AddressData);
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 404) {
          setAddressHasData(false);
        };
      });
    return () => { source.cancel(); }
  }, [address]);

  let previousAddress = (addressData) ? getPreviousAddress(address, { direction: addressData.side, excludeCrossStreets: true }) : undefined;
  let nextAddress = (addressData) ? getNextAddress(address, { direction: addressData.side, excludeCrossStreets: true }) : undefined;

  return {
    address,
    addressData,
    addressHasData,
    previousAddress,
    nextAddress,
  };
}

export function usePanoramaData() {
  const { width } = useAppContext();
  const mapWidth = width * 0.9;
  const { scrollDistance, setScrollDistance } = useContext(PanoramaContext);
  const { direction, years, addrOffset } = useParams() as URLParamsPanorama;
  const { addr: address, offset } = parseAddrOffset(addrOffset);
  const { x: addressX, coordinate, lat, lng, percentAlongPath, rotation } = labels.find(label => label.label.replace(/\s+/g, '') === address) as StripLabel;
  const [mapX, mapY] = latLngToXY([lat, lng], mapWidth);

  const x = addressX + offset;
  const leftX = x - width / 2;
  const rightX = x + width / 2;
  const visibleAddresses = labels.filter(d => d.direction === direction && d.x >= leftX && d.x <= rightX);

  return {
    address,
    offset,
    direction,
    years,
    x,
    leftX,
    rightX,
    width,
    coordinate,
    percentAlongPath,
    lat,
    lng,
    mapX,
    mapY,
    visibleAddresses,
    rotation,
    scrollDistance,
    setScrollDistance,
  };
}

export function useAddresses(direction?: Direction) {
  const { width } = useAppContext();
  const mapWidth = width * 0.9;
  return labels
    .filter(d => !direction || direction === d.direction)
    .map(d => {
      const [mapX, mapY] = latLngToXY([d.lat, d.lng], mapWidth);
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
  const pageType = (address) ? 'addressView' : 'panorama';
  const widthMultiplier = (pageType === 'panorama') ? 1 : 3.25;
  if (pageType === 'addressView') {
    direction = (parseInt(address as string) % 2 === 0) ? 's' : 'n';
  }
  let offset = 0;
  if (pageType === 'panorama') {
    const addressAndOffset = parseAddrOffset(addrOffset as string);
    address = addressAndOffset.addr;
    offset = addressAndOffset.offset;
  }
  // `newCenter` is x coordinate centered in the strip. By default, it's half the width of the screen to position the leftmost photos left
  let x = (getAddressX(address as string) + offset) * widthMultiplier;
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);

  // set a variable to store what direction the most recent data was loaded for, used to trigger the retrieval of the visible photos when the data has finished loaded
  const [directionLoaded, setDirectionsLoaded] = useState<Direction | undefined>()
  //const [boundaries, setBoundaries] = useState<[number, number]>();

  /* retrive the photos coordinates on initial load */
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    axios.get(`/data/photographs_${year}_${direction}.json`)
      .then(response => {
        setPhotoData((response.data as any)
          // at the moment there are some issues with the 1966 images where those above id 371 are misplaced relative to the other images
          .filter((row: any) => year !== 1966 || row.id < 371)
          .map((row: any) => ({
            identifier: row.identifier,
            x: (direction === 'n') ? parseFloat(row.coordinate) * mult * widthMultiplier : getOppositeX(parseFloat(row.coordinate) * mult) * widthMultiplier,
            facing: direction,
            year,
          }))
          .sort((a: any, b: any) => a.x - b.x));
        setDirectionsLoaded(direction);
      });
    return () => { source.cancel(); }
  }, [direction, year]);

  // get the address boundaries type is addressView
  // useEffect(() => {
  //   const cancelToken = axios.CancelToken;
  //   const source = cancelToken.source();
  //   axios.get(`/address_data/${address}.json`)
  //     .then(response => {
  //       const { boundaries } = response.data as AddressData;
  //       setBoundaries([boundaries[0] * mult, boundaries[1] * mult]);
  //     })
  //     .catch((reason: AxiosError) => {
  //       if (reason.response!.status === 404) {
  //         console.warn('no json file for this address');
  //       };
  //     });
  //   return () => { source.cancel(); }
  // }, [address]);

  return {
    photoData,
    directionLoaded,
    address,
    x,
    leftX: x - width / 2,
    rightX: x + width / 2,
    direction,
    widthMultiplier,
    //boundaries,
  }
}