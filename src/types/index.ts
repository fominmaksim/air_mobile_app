export type MessageHandler = (data: SensorReadings) => void;

// sensor

export type SensorStore = {
  room: RoomsEnum;
  sensor?: SensorReadings;
  setRoom: (room: RoomsEnum) => void;
  setSensor: (data: SensorReadings) => void;
};

export type SensorReadings = {
  temp?: number;
  humidity?: number;
  pressure?: number;
  gas?: number;
};

export type PostSensorReadingPayload = SensorReadings & {
  deviceId?: number;
};

// measurements

export type RoomMeasurementsResponse = SensorReadings & {
  bucket?: string;
};

export type RoomMeasurementsStore = {
  measurements?: RoomMeasurementsResponse[];
  setMeasurements?: (data: RoomMeasurementsResponse[]) => void;
};

// enums

export enum RoomsEnum {
  LIVING_ROOM = 'living_room',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  CORRIDOR = 'corridor',
}

export enum DataTypeEnum {
  TEMPERATURE = 'temp',
  HUMIDITY = 'humidity',
  PRESSURE = 'pressure',
  GAS = 'gas',
}
