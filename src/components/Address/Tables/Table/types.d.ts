export type UnstyledDataElement = string | number;

export type CellStyling = {
  text_align?: 'right' | 'left' | 'center';
  weight?: number;
  background_color?: string;
  border_color?: string;
};

export type StyledDataElement = {
  datum: UnstyledDataElement;
  style: CellStyling;
};

export type DataElement = UnstyledDataElement | StyledDataElement | JSX.Element | null;

export type HeaderElement = UnstyledDataElement | {
  key: string;
  content: StyledDataElement | JSX.Element;
} 

export type Table = {
  title: string;
  sources?: JSX.Element;
  headers: (HeaderElement)[];
  rows: {
    key: string;
    data: (DataElement)[];
  }[];
}

export type HeaderElementWithKey = {
  key: string; 
  style: Types.CellStyling; 
  content: JSX.Element | number | string | null;
};