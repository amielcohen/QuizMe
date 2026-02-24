import { View, Image, StyleSheet } from 'react-native';
import { TheColor } from '../constant/TheColor';
import { useTheme } from '../theme/useTheme';

function TrophyIcon({ tropyUrl }) {
  if (typeof tropyUrl !== 'string' || tropyUrl.trim() === '') return null;
  const { colors } = useTheme();
  return (
    <View style={[styles.iconContainer, { borderColor: colors.primary200 }]}>
      <Image source={{ uri: tropyUrl }} style={styles.icon} />
    </View>
  );
}

export default TrophyIcon;

const styles = StyleSheet.create({
  iconContainer: {
    width: 80,
    height: 80,
    padding: 12,
    margin: 8,
    borderRadius: 40,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
