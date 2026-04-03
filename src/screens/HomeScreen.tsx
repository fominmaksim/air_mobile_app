import { Text, View } from 'react-native';
import { useSensorStore } from '../store/sensor.store';
import { useSensorRealtime } from '../hooks/useSensorRealtime';
// import { Rooms } from '../types';

const HomeScreen = () => {
  const { data } = useSensorStore();

  useSensorRealtime();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Living room</Text>
      {data
       && (
        <>
          <Text>Temperature: {data.temp} C</Text>
          <Text>Humidity: {data.humidity}%</Text>
          <Text>Pressure: {data.pressure} hPa</Text>
          <Text>GAS: {data.gas}</Text>
        </>
      )}
      {/* <Button title="Living" onPress={() => setRoom(Rooms.LIVING_ROOM)} />
      <Button title="Bedroom" onPress={() => setRoom(Rooms.BEDROOM)} /> */}
    </View>
  );
};

export default HomeScreen;
