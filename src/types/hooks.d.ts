import { Direction, StripLabel, Photo } from '../index.d';

import { AddressData } from './AddressView.d';

export type AddressDataAndNavData = {
  addressHasData: boolean;
  address: string;
  previousAddress: string | undefined;
  nextAddress: string | undefined;
  oppositeAddress: string | undefined;
  addressData: AddressData | undefined;
}

export type PanoramaData = {
  address: string;
  offset: number;
  direction: Direction;
  yearsStr: string;
  years: number[];
  x: number;
  leftX: number;
  rightX: number;
  minX: number;
  maxX: number;
  width: number;
  coordinate: number;
  percentAlongPath: number;
  lat: number;
  lng: number;
  easternmostLongitude: number;
  mapX: number;
  mapY: number;
  visibleAddresses: StripLabel[],
  rotation: number;
  scrollDistance: number;
  scrollDistanceX: number;
  setScrollDistance: React.Dispatch<React.SetStateAction<number>>;
}