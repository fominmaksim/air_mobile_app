import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import React from 'react';

const BG_MAIN = '#5d689a';
const BG_DEFAULT = '#AAAED3';

type SmallInformationCardButtonProps = {
  data?: number | null;
  name?: string;
  selected?: boolean;
  unit?: string;
  onPress: () => void;
};

const SmallInformationCardButton = ({
  data,
  name,
  selected,
  unit,
  onPress,
}: SmallInformationCardButtonProps) => {
  return (
    <Card $selected={selected} onPress={onPress}>
      <TemperatureSection>
        {name != null && name !== '' ? <Label>{name}</Label> : null}
        <TemperatureRow>
          <MainValue>{data?.toFixed(1) ?? '—'}</MainValue>
          <Name>{unit}</Name>
        </TemperatureRow>
      </TemperatureSection>
      {/* <AnimatedCircularProgress
        rotation={270}
        // lineCap='square'
        arcSweepAngle={180}
        size={60}
        width={5}
        fill={100}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875"
      /> */}
    </Card>
  );
};

const Card = styled(Pressable)<{ $selected?: boolean }>`

  align-items: flex-start;
  display: flex;
  flex-direction: row;

  flex: 1;

  border-radius: 20px;
  padding: 15px 25px;
  background-color: ${({ $selected }) => ($selected ? BG_MAIN : BG_DEFAULT)};
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.2;
  shadow-radius: 5.62px;
  elevation: ${({ $selected }) => ($selected ? 7: 3)};
`;

const TemperatureRow = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const MainValue = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: #fff;
`;

const Label = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-left: 2px;
  color: #fff;
`;

const TemperatureSection = styled.View`
  
`

export default SmallInformationCardButton;
