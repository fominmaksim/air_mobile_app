import { httpClient } from './httpClient';

export type SensorReading = {
  temp: number;
  humidity: number;
  pressure: number;
  gas: number;
};

export type PostSensorReadingPayload = SensorReading & {
  deviceId?: number;
};

export type RoomMeasurementsResponse = {
  bucket: string;
  temp?: number;
  humidity?: number;
  pressure?: number;
  gas?: number;

};

export const sensorsApi = {
  postReading: (payload: PostSensorReadingPayload) =>
    httpClient.post<{ status: string }>('/sensor-readings', payload),

  getRoomMeasurements: () =>
    httpClient.get<RoomMeasurementsResponse[]>(`/measurements/get`),
};
