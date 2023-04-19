export type Direction = 'n' | 's'

export type Dimensions = {
  width: number;
  height: number;
  media: 'phone' | 'tablet' | 'laptop';
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
  coordinate: number;
  lat: number;
  lng: number;
  percentAlongPath: number;
  rotation: number;
};

export type StoryMetadata = {
  slug: string;
  title: string;
  author: string;
  img_id: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
};

export type Point = [number, number];

export type Year = 1966 | 1973 | 1985 | 1995 | 2007;

export type YearStr = "1966" | "1973" | "1985" | "1995" | "2007";

export type YearValues<Type, YearType extends string = YearStr> = {
  [key in YearType]: Type;
}