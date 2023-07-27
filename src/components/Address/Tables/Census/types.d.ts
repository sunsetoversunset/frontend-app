export type Row = {
  group?: {
    label: string;
    count: number;
    tooltip?: string;
    toggle?: {
      func: React.Dispatch<React.SetStateAction<boolean>>;
      value: boolean;
      labelTrue: string;
      labelFalse: string;
    };
  } | false;
  category: string;
  nogroup?: boolean;
  tooltip?: string;
  data: JSX.Element;
};