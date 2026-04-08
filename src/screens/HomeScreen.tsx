import { Text, View } from 'react-native';
import { useSensorStore } from '../store/sensor.store';
import { useSensorRealtime } from '../hooks/useSensorRealtime';
import MainInformationCard from '../components/MainInformationCard';
import SmallInformationCardButton from '../components/SmallInformationCardButton';
// import { Rooms } from '../types';

const HomeScreen = () => {
  const { data } = useSensorStore();

  useSensorRealtime();

  return (
    <View className="flex-1 bg-[#e3d1c4a2] pt-[80] pl-[20] pr-[20] pb-[20]">
      <Text className="text-5xl mb-10">Living room</Text>
      <View className="flex-row">
        <MainInformationCard data={data} />
      </View>
      <View className="flex-row gap-[1rem] mt-[2rem]">
        <SmallInformationCardButton
          data={data?.temp}
          text="Temperature"
          selected
        />
        <SmallInformationCardButton data={data?.humidity} text="Humidity" />
      </View>
      <View className="flex-row gap-[1rem] mt-[2rem]">
        <SmallInformationCardButton data={data?.pressure} text="Pressure" />
        <SmallInformationCardButton data={data?.gas} text="Gas" />
      </View>
      {/* {data && (
        <View className="text-left">
          <Text className="text-2xl mb-1">Temperature: {data.temp} C</Text>
          <Text className="text-2xl mb-1">Humidity: {data.humidity}%</Text>
          <Text className="text-2xl mb-1">Pressure: {data.pressure} hPa</Text>
          <Text className="text-2xl mb-">GAS: {data.gas}</Text>
        </View>
      )} */}
      {/* <Button title="Living" onPress={() => setRoom(Rooms.LIVING_ROOM)} />
      <Button title="Bedroom" onPress={() => setRoom(Rooms.BEDROOM)} /> */}
    </View>
  );
};

export default HomeScreen;
