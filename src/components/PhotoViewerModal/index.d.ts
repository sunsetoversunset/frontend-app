export type Props = {
  id: string;
  setModalId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type PhotoData = {
  id: string;
  next_id: string | undefined;
  previous_id: string | undefined;
  side: 'n' | 's';
  year: number;
  coordinate: number;
}