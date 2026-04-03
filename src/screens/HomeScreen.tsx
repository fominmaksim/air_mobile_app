import { Text, View } from 'react-native';
import { useSensorStore } from '../store/sensor.store';
import { useSensorRealtime } from '../hooks/useSensorRealtime';
// import { Rooms } from '../types';

const HomeScreen = () => {
  const { data } = useSensorStore();

  useSensorRealtime();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl mb-10">Living room</Text>
      {data && (
        <>
          <Text className="text-2xl mb-1">Temperature: {data.temp} C</Text>
          <Text className="text-2xl mb-1">Humidity: {data.humidity}%</Text>
          <Text className="text-2xl mb-1">Pressure: {data.pressure} hPa</Text>
          <Text className="text-2xl mb-">GAS: {data.gas}</Text>
        </>
      )}
      {/* <Button title="Living" onPress={() => setRoom(Rooms.LIVING_ROOM)} />
      <Button title="Bedroom" onPress={() => setRoom(Rooms.BEDROOM)} /> */}
    </View>
  );
};

export default HomeScreen;
