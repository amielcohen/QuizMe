import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function StatItem({ label, value, icon }) {
  return (
    <View style={styles.statRow}>
      <View style={styles.statLeft}>
        <View style={styles.statIcon}>
          <Ionicons name={icon} size={18} color="#083344" />
        </View>
        <Text style={styles.statLabel}>{label}</Text>
      </View>

      <Text style={styles.statValue}>{String(value)}</Text>
    </View>
  );
}

export default StatItem;

const styles = StyleSheet.create({
  statRow: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  statLabel: {
    color: '#0f172a',
    fontWeight: '700',
  },
  statValue: {
    color: '#083344',
    fontWeight: '900',
    fontSize: 18,
  },
});
