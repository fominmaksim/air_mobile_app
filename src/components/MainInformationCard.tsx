import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';
import {
  getComfortScore,
  indoorFeelsLikeCelsius,
} from '../utils/indoorFeelsLike';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';

type InformationCardProps = {
  selectedMainLiveValue?: number;
  data?: { temp?: number; humidity?: number } | null;
  stats: ChartData;
};

const MainInformationCard = ({
  selectedMainLiveValue,
  data,
  stats,
}: InformationCardProps) => {
  const parsedSelectedMainLiveValue = selectedMainLiveValue?.toFixed(1);

  const temp = data?.temp || 0;
  const hum = data?.humidity || 0;
  const feelsLike = indoorFeelsLikeCelsius(temp, hum);
  const comfort = getComfortScore(temp, hum);

  const [chartWidth, setChartWidth] = useState(0);

  const newChartWidth = chartWidth - 25; // considering padding right 25px;

  return (
    <Card>
      <Header>
        <TemperatureRow>
          <TemperatureValue>
            {parsedSelectedMainLiveValue ?? '—'}
          </TemperatureValue>
          <Celsius>{'\u00B0C'}</Celsius>
        </TemperatureRow>
        <ExtraData>
          <FeelsLikeWrap>
            <ExtraDataRow>
              <FeelsLikeText>Comfort score: </FeelsLikeText>
              <FeelsLikeText>
                {feelsLike != null && comfort != null
                  ? `${comfort.score} · ${comfort.label}`
                  : '—'}
              </FeelsLikeText>
            </ExtraDataRow>
          </FeelsLikeWrap>
          <RangeLine />
          <MinMaxRow>
            <ExtraDataRow>
              <ExtraText>Min: </ExtraText>
              <ExtraText>19.4{'\u00B0C'}</ExtraText>
            </ExtraDataRow>
            <ExtraDataRow>
              <ExtraText>Max: </ExtraText>
              <ExtraText>29.4{'\u00B0C'}</ExtraText>
            </ExtraDataRow>
          </MinMaxRow>
        </ExtraData>
      </Header>
      <Spacer />
      <ChartRow
        onLayout={e => {
          const w = e.nativeEvent.layout.width;
          setChartWidth(w);
        }}
      >
        {newChartWidth && stats && (
          <LineChart
            data={stats}
            width={newChartWidth}
            height={160}
            chartConfig={chartConfig}
            bezier
            withDots={false}
            withInnerLines={false}
            transparent
          />
        )}
      </ChartRow>
    </Card>
  );
};

const Card = styled.View`
  flex: 1;
  background-color: #5d689a;
  border-radius: 30px;
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.2;
  shadow-radius: 5.62px;
  elevation: 7;
`;

const RangeLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.25);
  margin: 10px 0 8px 0;
`;

const MinMaxRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TemperatureRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
`;

const TemperatureValue = styled.Text`
  font-size: 55px;
  font-weight: 700;
  color: rgb(242, 242, 242);
  text-shadow: 0px 1px 1px #1d1d1d2d;
`;

const Celsius = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-left: 2px;
  color: rgb(242, 242, 242);
  text-shadow: 0px 1px 1px #1d1d1d2d;
`;

const Spacer = styled.View``;

const ChartRow = styled.View`
  margin-top: 25px;
  padding: 0 25px 30px 5px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 25px 0 25px;
`;

const FeelsLikeWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const ExtraData = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const ExtraDataRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ExtraText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
`;

const FeelsLikeText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
`;

const chartConfig = {
  backgroundColor: 'transparent',
  color: (_opacity = 1) => `rgb(255, 255, 255)`,
  labelColor: (_opacity = 1) => `rgb(255, 255, 255)`,
  strokeWidth: 3,
  decimalPlaces: 1,

  propsForLabels: { fontSize: 12, fontWeight: 500, fill: '#fff' },
};

export default MainInformationCard;
