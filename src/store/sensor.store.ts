
import { create } from 'zustand';
import { RoomsEnum, SensorReadings, SensorStore } from '../types';

export const useSensorStore = create<SensorStore>(set => ({
  room: RoomsEnum.LIVING_ROOM,
  sensor: undefined,

  setRoom: (room: RoomsEnum) => set({ room }),
  setSensor: (sensor: SensorReadings) => set({ sensor }),
}));
