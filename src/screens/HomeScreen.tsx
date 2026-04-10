import styled from 'styled-components/native';
import { useSensorStore } from '../store/sensor.store';
import { useSensorRealtime } from '../hooks/useSensorRealtime';
import MainInformationCard from '../components/MainInformationCard';
import SmallInformationCardButton from '../components/SmallInformationCardButton';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { sensorsApi } from '../api';


const HomeScreen = () => {
  const { data } = useSensorStore();
  const [stats, setStats] = useState({
    labels: [''],
    datasets: [
      {
        data: [0],
        color: (opacity = 1) => `rgba(134, 65, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Temperature'], // optional
  });

  const { width: screenWidth } = Dimensions.get('window');
  console.log('screenWidth', screenWidth);
  useSensorRealtime();

  const formatTimeLabel = (value: Date | number) => {
    const date = value instanceof Date ? value : new Date(value);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  const getMeasurements = async () => {
    const res = await sensorsApi.getRoomMeasurements();

    const n = res.length;
    const labelCount = 4;
    const labels = res.map((el, i) => {
      if (n <= labelCount) {
        return formatTimeLabel(el.bucket); // your formatter
      }
      // indices: 0, ~1/3, ~2/3, n-1
      const step = (n - 1) / (labelCount - 1);
      const show = [0, 1, 2, 3].some(k => Math.round(k * step) === i);
      return show ? formatTimeLabel(el.bucket) : '';
    });

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: res.map(el => el.temp),
          color: (opacity = 1) => `rgba(255, 232, 215, 0.821)`, // optional
          strokeWidth: 2, // optional
        },
      ],
      // legend: ['Temperature'], // optional
    };
    console.log('chartData', chartData);
    setStats(chartData);
  };

  console.log('stats', stats);

  useEffect(() => {
    getMeasurements().catch(error => {
      console.warn('Failed to load chart measurements', error);
    });
  }, []);

  return (
    <Container>
      <Title>Living room</Title>
      <Row>
        <MainInformationCard data={data} stats={stats} />
      </Row>
      <SpacedRow>
        <SmallInformationCardButton
          data={data?.temp}
          text="Temperature"
          selected
          name={`${'\u00B0'}C`}
        />
        <SmallInformationCardButton
          data={data?.humidity}
          text="Humidity"
          name="%"
        />
      </SpacedRow>
      <SpacedRow>
        <SmallInformationCardButton
          data={data?.pressure}
          text="Pressure"
          name="hPa"
        />
        <SmallInformationCardButton data={data?.gas} text="Gas" />
      </SpacedRow>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  /* background-color: rgba(227, 209, 196, 0.64); */
  /* background-color: #a98596; */
  background-color: #fce4e2;
  padding-top: 50px;
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
