import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { getTextColorForBackground, lightenColor } from '../../utils/color-manipulations';
import StatItem from '../../components/StatItem';
import PrimeButton from '../../components/PrimeButtom';
import { resetQuizSession } from '../../store/redux/quiz';
import { useTheme } from '../../theme/useTheme';

function QuizSummary({ route, navigation }) {
  const { quizId } = route.params;
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const session = useSelector((state) => state.quiz.sessionsByQuizId[quizId]);

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 18 }}>Session not found.</Text>
        <PrimeButton
          onPress={() => navigation.navigate('BottomTabsNavigator')}
          text="Back to Home"
          color={colors.primary100}
        />
      </View>
    );
  }

  const { quizTitle, quizColor, correctCount, shuffledAnswersByIndex } = session;

  const textColor = getTextColorForBackground(quizColor);
  const infoBackgroundColor = lightenColor(quizColor);

  const totalQuestions = shuffledAnswersByIndex.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPass = scorePercent >= 60;

  const summaryStats = [
    { label: 'Final Score:', value: `${scorePercent}%`, icon: 'trophy-outline' },
    {
      label: 'Correct Answers:',
      value: `${correctCount} / ${totalQuestions}`,
      icon: 'checkmark-circle-outline',
    },
    {
      label: 'Performance:',
      value: isPass ? 'Great Job!' : 'Keep Practicing',
      icon: isPass ? 'thumbs-up-outline' : 'book-outline',
    },
  ];

  function handleBackToHome() {
    dispatch(resetQuizSession({ quizId }));
    navigation.popToTop();
  }

  function handleRestart() {
    dispatch(resetQuizSession({ quizId }));
    navigation.replace('Quiz Page', { quizId });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary400 }]}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.quizInfoContainer, { backgroundColor: quizColor }]}>
        <Text style={[styles.summaryHeader, { color: textColor }]}>Quiz Summary</Text>

        <View style={styles.iconContainer}>
          <Ionicons
            name={isPass ? 'ribbon' : 'alert-circle-outline'}
            size={100}
            color={textColor}
          />
        </View>

        <Text style={[styles.quizTitle, { color: textColor }]}>{quizTitle}</Text>

        <View
          style={[
            styles.infoContainer,
            { borderColor: textColor, backgroundColor: infoBackgroundColor },
          ]}
        >
          {summaryStats.map((s) => (
            <View key={s.label} style={{ marginBottom: 12 }}>
              <StatItem label={s.label} value={s.value} icon={s.icon} />
            </View>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.buttonRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <PrimeButton onPress={handleRestart} text="Restart" color={colors.primary200} />
          </View>
          <View style={{ flex: 1 }}>
            <PrimeButton onPress={handleBackToHome} text="Finish" color={colors.primary100} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default QuizSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  quizInfoContainer: {
    flex: 0.85,
    alignItems: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  summaryHeader: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    opacity: 0.9,
  },
  iconContainer: {
    marginVertical: 15,
  },
  infoContainer: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
});
