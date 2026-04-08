import styled from 'styled-components/native';

const BG_MAIN = '#A2ADC0';
const BG_DEFAULT = '#E4DBD4';

type SmallInformationCardButtonProps = {
  data?: number | null;
  text?: string;
  selected?: boolean;
};

const SmallInformationCardButton = ({
  data,
  text,
  selected,
}: SmallInformationCardButtonProps) => {
  return (
    <Card $selected={selected}>
      <TemperatureRow>
        <TemperatureValue>{data ?? '—'}</TemperatureValue>
      </TemperatureRow>
      {text != null && text !== '' ? (
        <Label>{text}</Label>
      ) : null}
    </Card>
  );
};

const Card = styled.View<{ $selected?: boolean }>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 180px;
  border-radius: 30px;
  padding: 25px;
  background-color: ${({ $selected }) => ($selected ? BG_MAIN : BG_DEFAULT)};
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
  font-weight: 400;
`;

const Label = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
`;

export default SmallInformationCardButton;
