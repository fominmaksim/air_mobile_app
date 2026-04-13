import styled from 'styled-components/native';
import { useSensorRealtime } from '../hooks/useSensorRealtime';
import MainInformationCard from '../components/MainInformationCard';
import SmallInformationCardButton from '../components/SmallInformationCardButton';
import { DataTypeEnum } from '../types';
import { useDisplaySelectedMeasurements } from '../hooks/useDislplaySelectedMeasurements';
import { useMeasurements } from '../hooks/useMeasurements';

const HomeScreen = () => {
  const {
    allLiveSensorValues,
    sensorLiveValue,
    chartData,
    selectedDataType,
    setSelectedDataType,
  } = useDisplaySelectedMeasurements();

  console.log(
    'stuff',
    allLiveSensorValues,
    sensorLiveValue,
    chartData,
    selectedDataType,
  );

  const handlePress = (type: DataTypeEnum) => {
    setSelectedDataType(type);
  };

  useSensorRealtime();
  useMeasurements();

  return (
    <Container>
      <Row>
        <MainInformationCard
          data={allLiveSensorValues}
          selectedMainLiveValue={sensorLiveValue}
          stats={chartData}
        />
      </Row>
      <CarsdWrapper>
        <OtherCards>
          <SmallInformationCardButton
            selected={selectedDataType === DataTypeEnum.TEMPERATURE}
            data={allLiveSensorValues?.temp}
            name={DataTypeEnum.TEMPERATURE}
            unit={`${'\u00B0'}C`}
            onPress={() => handlePress(DataTypeEnum.TEMPERATURE)}
          />
          <SmallInformationCardButton
            selected={selectedDataType === DataTypeEnum.HUMIDITY}
            data={allLiveSensorValues?.humidity}
            name={DataTypeEnum.HUMIDITY}
            unit="%"
            onPress={() => handlePress(DataTypeEnum.HUMIDITY)}
          />

          <SmallInformationCardButton
            selected={selectedDataType === DataTypeEnum.PRESSURE}
            data={allLiveSensorValues?.pressure}
            name={DataTypeEnum.PRESSURE}
            unit="hPa"
            onPress={() => handlePress(DataTypeEnum.PRESSURE)}
          />
          <SmallInformationCardButton
            selected={selectedDataType === DataTypeEnum.GAS}
            data={allLiveSensorValues?.gas}
            name={DataTypeEnum.GAS}
            onPress={() => handlePress(DataTypeEnum.GAS)}
          />
        </OtherCards>
      </CarsdWrapper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  background-color: #fce4e2;
`;

const Row = styled.View`
  padding: 12px;
`;

const OtherCards = styled.View`
  gap: 20px;
`;

const CarsdWrapper = styled.View`
  background-color: #f2b9ab;
  margin-top: 5px;
  border-radius: 30px;
  padding: 25px 20px 20px 20px;
`;

export default HomeScreen;
