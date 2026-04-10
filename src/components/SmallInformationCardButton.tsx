import styled from 'styled-components/native';

const BG_MAIN = '#5d689a';
// const BG_MAIN = '#443F57';
const BG_DEFAULT = '#AAAED3';
// const BG_DEFAULT = '#AB8FA1';

type SmallInformationCardButtonProps = {
  data?: number | null;
  text?: string;
  selected?: boolean;
  name?: string;
};

const SmallInformationCardButton = ({
  data,
  text,
  selected,
  name,
}: SmallInformationCardButtonProps) => {
  return (
    <Card $selected={selected}>
      <TemperatureRow>
        <MainValue>{data?.toFixed(1) ?? '—'}</MainValue>
        <Name>{name}</Name>
      </TemperatureRow>
      {text != null && text !== '' ? <Label>{text}</Label> : null}
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
  elevation: ${({ $selected }) => ($selected ? 7: 3)};
`;

const TemperatureRow = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const MainValue = styled.Text`
  font-size: 40px;
  font-weight: 500;
  /* color: #e9d78d; */
  color: #fff;
`;

const Label = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  /* color: #e9d68d; */
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-left: 2px;
  color: #fff;
  /* color: #e9d68d; */
`;

export default SmallInformationCardButton;
