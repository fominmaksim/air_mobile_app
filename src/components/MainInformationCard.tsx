import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#A2ADC0",
    borderRadius: 30,
    padding: 25,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  tempValue: {
    fontSize: 40,
    fontWeight: "700",
  },

  celsius: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 2,
  },
});

type InformationCardProps = {
  data?: { temp?: number } | null;
};

const MainInformationCard = ({ data }: InformationCardProps) => {

  const remp = data?.temp?.toFixed(1)
  return (
    <View style={styles.card}>
      <View style={styles.tempRow}>
        <Text style={styles.tempValue}>{remp ?? '—'}</Text>
        <Text style={styles.celsius}>{'\u00B0C'}</Text>
      </View>
      <View />
    </View>
  );
};

export default MainInformationCard;
