export interface Dimensions {
  width: number;
  height: number;
  media: 'phone' | 'tablet-portrait' | 'desktop';
}

export type Direction = 'n' | 's';

export interface URLParams {
  direction?: Direction;
  addr: string;
  offset: string;
}
