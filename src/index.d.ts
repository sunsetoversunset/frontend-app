export interface Dimensions {
  width: number;
  height: number;
  media: 'phone' | 'tablet-portrait' | 'desktop';
}

export type Direction = 'n' | 's';

export interface URLParams {
  years?: string;
  direction?: Direction;
  addrOffset?: string;
}

export type URLParamsPanorama = {
  years: string;
  direction: Direction;
  addrOffset: string;
}

export type Point = [number, number];
