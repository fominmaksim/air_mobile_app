import { create } from 'zustand';
import { Rooms, SensorStore } from '../types';

export const useSensorStore = create<SensorStore>(set => ({
  room: Rooms.LIVING_ROOM,
  data: null,

  setRoom: (room: Rooms) => set({ room }),
  setData: (data: any) => set({ data }),
}));
