import { StyleSheet, Text, View } from 'react-native';

const BG_MAIN = '#A2ADC0';
const BG_DEFAULT = '#E4DBD4';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 180,
    borderRadius: 30,
    padding: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  tempValue: {
    fontSize: 40,
    fontWeight: '400',
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

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
    <View
      style={[styles.card, { backgroundColor: selected ? BG_MAIN : BG_DEFAULT }]}>
      <View style={styles.tempRow}>
        <Text style={styles.tempValue}>{data ?? '—'}</Text>
      </View>
      {text != null && text !== '' ? (
        <Text style={styles.label}>{text}</Text>
      ) : null}
    </View>
  );
};

export default SmallInformationCardButton;
