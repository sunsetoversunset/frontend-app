export type Direction = 'n' | 's'

export interface Dimensions {
  width: number;
  height: number;
  media: 'phone' | 'tablet-portrait' | 'desktop';
}

export interface URLParams {
  years: string;
  direction: Direction;
  addrOffset: string;
}

export type StripLabel = {
  label: string;
  direction: Direction;
  x: number;
  lat: number;
  lng: number;
  percentAlongPath: number;
  rotation: number;
};



export type Point = [number, number];
