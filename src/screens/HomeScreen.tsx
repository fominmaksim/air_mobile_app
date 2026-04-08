import styled from 'styled-components/native';
import { useSensorStore } from '../store/sensor.store';
import { useSensorRealtime } from '../hooks/useSensorRealtime';
import MainInformationCard from '../components/MainInformationCard';
import SmallInformationCardButton from '../components/SmallInformationCardButton';
// import { Rooms } from '../types';

const HomeScreen = () => {
  const { data } = useSensorStore();

  useSensorRealtime();

  return (
    <Container>
      <Title>Living room</Title>
      <Row>
        <MainInformationCard data={data} />
      </Row>
      <SpacedRow>
        <SmallInformationCardButton
          data={data?.temp}
          text="Temperature"
          selected
        />
        <SmallInformationCardButton data={data?.humidity} text="Humidity" />
      </SpacedRow>
      <SpacedRow>
        <SmallInformationCardButton data={data?.pressure} text="Pressure" />
        <SmallInformationCardButton data={data?.gas} text="Gas" />
      </SpacedRow>
      {/* {data && (
        <Row>
          <Title>Temperature: {data.temp} C</Title>
          <Title>Humidity: {data.humidity}%</Title>
          <Title>Pressure: {data.pressure} hPa</Title>
          <Title>GAS: {data.gas}</Title>
        </Row>
      )} */}
      {/* <Button title="Living" onPress={() => setRoom(Rooms.LIVING_ROOM)} />
      <Button title="Bedroom" onPress={() => setRoom(Rooms.BEDROOM)} /> */}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: rgba(227, 209, 196, 0.64);
  padding-top: 80px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 48px;
  margin-bottom: 40px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const SpacedRow = styled(Row)`
  gap: 16px;
  margin-top: 32px;
`;

export default HomeScreen;
