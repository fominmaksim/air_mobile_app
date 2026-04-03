export type MessageHandler = (data: unknown) => void;
export type SensorStore = {
  room: Rooms;
  data: any;
  setRoom: (room: Rooms) => void;
  setData: (data: any) => void;
};

export enum Rooms {
  LIVING_ROOM = 'living_room',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  CORRIDOR = 'corridor',
}
