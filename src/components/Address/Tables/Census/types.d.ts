export type Row = {
  group?: {
    label: string;
    count: number;
    tooltip?: string;
  } | false;
  category: string;
  nogroup?: boolean;
  tooltip?: string;
  data: JSX.Element;
};