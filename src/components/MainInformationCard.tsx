import styled from 'styled-components/native';

type InformationCardProps = {
  data?: { temp?: number } | null;
};

const MainInformationCard = ({ data }: InformationCardProps) => {
  const remp = data?.temp?.toFixed(1);
  return (
    <Card>
      <TemperatureRow>
        <TemperatureValue>{remp ?? '—'}</TemperatureValue>
        <Celsius>{'\u00B0C'}</Celsius>
      </TemperatureRow>
      <Spacer />
    </Card>
  );
};

const Card = styled.View`
  flex: 1;
  background-color: #a2adc0;
  border-radius: 30px;
  padding: 25px;
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.2;
  shadow-radius: 5.62px;
  elevation: 7;
`;

const TemperatureRow = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const TemperatureValue = styled.Text`
  font-size: 40px;
  font-weight: 700;
`;

const Celsius = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-left: 2px;
`;

const Spacer = styled.View``;

export default MainInformationCard;
