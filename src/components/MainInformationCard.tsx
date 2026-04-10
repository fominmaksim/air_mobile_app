import { useState, type ComponentProps } from 'react';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';
type InformationCardProps = {
  data?: { temp?: number } | null;
  stats: ComponentProps<typeof LineChart>['data'];
};

const MainInformationCard = ({ data, stats }: InformationCardProps) => {
  const remp = data?.temp?.toFixed(1);
  const [chartWidth, setChartWidth] = useState(0);
  console.log('screenWidth', chartWidth);

  const newChartWidth = chartWidth - 25; // consider padding right 25px;


  return (
    <Card>
      <Header>
        <TemperatureRow>
          {/* <MaterialCommunityIcons
          name="arrow-top-left"
          size={34}
          color="#fff"
        /> */}
          <TemperatureValue>{remp ?? '—'}</TemperatureValue>
          <Celsius>{'\u00B0C'}</Celsius>
        </TemperatureRow>
        <ExtraData>
          <FeelsLikeWrap>
            <ExtraDataRow>
              <FeelsLikeText>Feels like: </FeelsLikeText>
              <FeelsLikeText>
                20.4{'\u00B0C'}
              </FeelsLikeText>
            </ExtraDataRow>
          </FeelsLikeWrap>
          <RangeLine />
          <MinMaxRow>
            <ExtraDataRow>
              <ExtraText>Min: </ExtraText>
              <ExtraText>
                19.4{'\u00B0C'}
              </ExtraText>
            </ExtraDataRow>
            <ExtraDataRow>
              <ExtraText>Max: </ExtraText>
              <ExtraText>
                29.4{'\u00B0C'}
              </ExtraText>
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
      </ChartRow>
    </Card>
  );
};

const Card = styled.View`
  flex: 1;
  /* background-color: #a2adc0; */
  /* background-color: #443F57; */
  background-color: #5d689a;
  border-radius: 40px;
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
  /* color: #ffffffcc; */
  /* color: #e9d68d; */
`;

const Celsius = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-left: 2px;
  color: rgb(242, 242, 242);
  text-shadow: 0px 1px 1px #1d1d1d2d;
  /* color: rgba(255, 232, 215, 0.821); */
  /* color: #ffffffcc; */
  /* color: #e9d68d; */
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
  /* color: rgba(255, 232, 215, 0.821); */
  /* text-shadow: 0px 1px 1px #1d1d1d2d; */
`;

const FeelsLikeText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  /* color: rgba(255, 232, 215, 0.821); */
  /* text-shadow: 0px 1px 1px #1d1d1d2d; */
`;

const chartConfig = {
  // backgroundGradientFrom: '#1E2923',
  // backgroundGradientFromOpacity: 0,
  // backgroundGradientTo: '#08130D',
  // backgroundGradientToOpacity: 0.5,
  backgroundColor: 'transparent',
  // color: (_opacity = 1) => `rgb(255, 232, 215)`,
  // labelColor: (_opacity = 1) => `rgb(255, 232, 215)`,
  color: (_opacity = 1) => `rgb(255, 255, 255)`,
  labelColor: (_opacity = 1) => `rgb(255, 255, 255)`,
  strokeWidth: 4, // optional, default 3
  // barPercentage: 0.5,
  decimalPlaces: 1,

  propsForLabels: { fontSize: 12, fontWeight: 500, fill: '#fff' }, 
};

export default MainInformationCard;
