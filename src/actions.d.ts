export interface ToggleDirection {
  type: 'toggle_direction';
}

export interface Scroll {
  type: 'scroll';
  payload: number;
}

export type LinkAction = ToggleDirection | Scroll;