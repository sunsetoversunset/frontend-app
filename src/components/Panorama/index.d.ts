import { Direction } from '../../index.d';

export type URLParamsPanorama = {
  direction: Direction;
  addrOffset: string;
  years: string;
};

export type PhotoData = {
  identifier: string;
  coordinate: number;
  x: number;
  facing: Direction;
  year: number;
  opacity?: number;
};

export type PanoramaContextParams = {
  scrollDistance: number;
  setScrollDistance: React.Dispatch<React.SetStateAction<number>>;
};