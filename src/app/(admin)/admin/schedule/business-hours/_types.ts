type Row = {
  id: string;
  weekday: number;
  startMin: number;
  endMin: number;
  isClosed: boolean;
};

type EditingState =
  | { mode: 'create'; weekday: number; startHHMM: string; endHHMM: string }
  | { mode: 'edit'; row: Row; startHHMM: string; endHHMM: string };
