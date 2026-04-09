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
          symbol={`${'\u00B0'}C`}
        />
        <SmallInformationCardButton
          data={data?.humidity}
          text="Humidity"
          symbol='%'
        />
      </SpacedRow>
      <SpacedRow>
        <SmallInformationCardButton
          data={data?.pressure}
          text="Pressure"
          symbol='hPa'
        />
        <SmallInformationCardButton data={data?.gas} text="Gas" />
      </SpacedRow>
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
