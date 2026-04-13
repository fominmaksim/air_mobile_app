import { PostSensorReadingPayload, RoomMeasurementsResponse } from '../types';
import { httpClient } from './httpClient';

export const sensorsApi = {
  postReading: (payload: PostSensorReadingPayload) =>
    httpClient.post<{ status: string }>('/sensor-readings', payload),

  getRoomMeasurements: () =>
    httpClient.get<RoomMeasurementsResponse[]>(`/measurements/get`),
};
