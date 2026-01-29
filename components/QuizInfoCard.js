import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
import { TheColor } from '../constant/TheColor';
function QuizInfoCard({ title, imageUrl, tags, questionCount, createdBy, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={onPress}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View>
              <Text style={styles.createdBy}>Create by: {createdBy}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default QuizInfoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  titleContainer: {
    marginBottom: 8,
    backgroundColor: TheColor.primary200,
  },
  card: {
    backgroundColor: TheColor.primary300,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    elevation: 4,
    borderColor: TheColor.primary200,
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  createdBy: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
