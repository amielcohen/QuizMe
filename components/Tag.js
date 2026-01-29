import { View, Text, StyleSheet } from 'react-native';

function Tag({ color, backgroundColor, text }) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </View>
  );
}
export default Tag;
const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 12,
    margin: 4,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
});
