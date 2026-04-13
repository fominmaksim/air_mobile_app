import { create } from 'zustand';
import { RoomMeasurementsResponse, RoomMeasurementsStore } from '../types';

export const useMeasurementsStore = create<RoomMeasurementsStore>(set => ({
  measurements: [],
  setMeasurements: (measurements?: RoomMeasurementsResponse[]) =>
    set({ measurements }),

}));
