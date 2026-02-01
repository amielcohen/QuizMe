import { Text, Button, View, StyleSheet, Image, ScrollView } from 'react-native';
import { QuizInfos } from '../../data/dummy-quizInfo';
import { TheColor } from '../../constant/TheColor';
import {
  getTextColorForBackground,
  getComplementaryColor,
  lightenColor,
} from '../../utils/color-manipulations';
import Tag from '../../components/Tag';
import PrimeButton from '../../components/PrimeButtom';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import StatItem from '../../components/StatItem';

function QuizPage({ route, navigation }) {
  const quizId = route.params.quizId;
  const quiz = QuizInfos.find((q) => q.id === quizId);
  const textColor = getTextColorForBackground(quiz.color);
  const tagBackgroundColor = getComplementaryColor(quiz.color);
  const infoBackgroundColor = lightenColor(quiz.color);
  const [isFavorite, setIsFavorite] = useState(false);

  const stats = [
    { label: 'Creat By:', value: quiz.createdBy, icon: 'person-outline' },
    { label: 'Questions:', value: quiz.questionCount, icon: 'help' },
    { label: 'Best Score:', value: 1 + '/' + quiz.questionCount, icon: 'game-controller-outline' },
  ];

  function handleStartQuiz() {
    //navigation.navigate('QuizScreen', { quizId: quiz.id });
    console.log('Start Quiz button pressed');
  }

  function handleAddToFavorites() {
    console.log('Add to Favorites button pressed');
    if (isFavorite === false) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.quizInfoContainer, { backgroundColor: quiz.color }]}>
        <View style={{ position: 'absolute', top: 16, right: 16 }}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            color={textColor}
            size={30}
            onPress={() => handleAddToFavorites()}
          />
        </View>
        <Text style={[styles.title, { color: textColor }]}>{quiz.title}</Text>

        <Image source={{ uri: quiz.imageUrl }} style={styles.image} />
        <View style={styles.tagsContainer}>
          {quiz.tags.map((tag) => (
            <Tag
              key={tag}
              color={getTextColorForBackground(tagBackgroundColor)}
              backgroundColor={tagBackgroundColor}
              text={tag}
            />
          ))}
        </View>
        <View
          style={[
            styles.infoContainer,
            { borderColor: textColor, backgroundColor: infoBackgroundColor },
          ]}
        >
          {stats.map((s) => (
            <View key={s.label} style={{ marginBottom: 8 }}>
              <StatItem label={s.label} value={s.value} icon={s.icon} />
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.startButtonContainer}>
          <PrimeButton onPress={handleStartQuiz} text="Start Quiz" color={TheColor.primary100} />
        </View>
      </View>
    </View>
  );
}
export default QuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TheColor.primary400,
  },
  quizInfoContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    margin: 16,
    marginVertical: 32,
    marginBottom: 70,
    borderRadius: 18,
    elevation: 4,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  infoContainer: {
    width: '90%',
    marginTop: 12,
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 8,
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 4,
  },
  startButtonContainer: {
    marginTop: 10,
  },
});
