export type Direction = 'n' | 's'

export type Dimensions = {
  width: number;
  height: number;
  media: 'phone' | 'tablet-portrait' | 'desktop';
}

export type AppContextParams = Dimensions & {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
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
