import { View, Text, StyleSheet, StatusBar, Modal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QuestionCard from '../../components/QuestionCard';
import AnswerCard from '../../components/AnswerCard';
import { questions as allData } from '../../data/dummy-questions';
import { QuizInfos } from '../../data/dummy-quizInfo';
import { useTheme } from '../../theme/useTheme';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initQuizIfNeeded, resetQuizSession, selectAnswer, goNext } from '../../store/redux/quiz';

function QuizPage({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { quizId } = route?.params;

  const quizQuestions = useMemo(() => allData.filter((q) => q.quizInfoId === quizId), [quizId]);
  const quiz = QuizInfos.find((q) => q.id === quizId);

  const quizLength = quizQuestions.length;

  const session = useSelector((state) => state.quiz.sessionsByQuizId[quizId]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const { colors } = useTheme();
  // Initial Logic: Run only once on mount
  useEffect(() => {
    if (session) {
      const hasProgress =
        session.currentIndex > 0 || Object.keys(session.answeredByIndex).length > 0;
      if (hasProgress && !session.finished) {
        setShowResumeModal(true);
      }
    } else {
      dispatch(
        initQuizIfNeeded({
          quizId,
          questions: quizQuestions,
          title: quiz.title,
          color: quiz.color,
        }),
      );
    }
  }, []); // Empty dependency array ensures this runs once

  // Handle Quiz End
  useEffect(() => {
    if (session?.finished) {
      const timer = setTimeout(() => {
        navigation.replace('Quiz Summary', {
          quizId,
          correctCount: session.correctCount,
          quizLength,
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [session?.finished, navigation, quizId, session?.correctCount, quizLength]);

  if (!session) return null;

  const currentIndex = session.currentIndex;
  const currentQuestion = quizQuestions[currentIndex];
  const currentAnswers = session.shuffledAnswersByIndex[currentIndex];
  const currentAnswered = session.answeredByIndex[currentIndex];
  const selectedAnswerId = currentAnswered?.selectedAnswerId;

  const percent = session?.finished ? 100 : Math.round((currentIndex / quizLength) * 100);
  function handlePick(answer) {
    if (selectedAnswerId !== undefined) return;

    dispatch(
      selectAnswer({
        quizId,
        questionIndex: currentIndex,
        selectedAnswerId: answer.text,
        isCorrect: answer.isCorrect,
      }),
    );

    setTimeout(() => {
      dispatch(goNext({ quizId, quizLength }));
    }, 700);
  }

  function getVariantForAnswer(answerText, isCorrect) {
    if (selectedAnswerId === undefined) return 'default';
    if (answerText === selectedAnswerId) {
      return isCorrect ? 'correct' : 'wrong';
    }
    return 'disabled';
  }

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      <Modal transparent visible={showResumeModal} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Resume quiz?</Text>
            <Text style={styles.modalText}>
              You already started this quiz. Do you want to continue from where you left off or
              start over?
            </Text>
            <View style={styles.modalButtonsRow}>
              <Pressable
                style={[styles.modalBtn, styles.modalBtnSecondary]}
                onPress={() => {
                  dispatch(resetQuizSession({ quizId }));
                  dispatch(
                    initQuizIfNeeded({
                      quizId,
                      questions: quizQuestions,
                      title: quiz.title,
                      color: quiz.color,
                    }),
                  );
                  setShowResumeModal(false);
                }}
              >
                <Text style={[styles.modalBtnText, styles.modalBtnTextSecondary]}>Start over</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.modalBtn,

                  { backgroundColor: colors.primary300, borderColor: colors.primary300 },
                ]}
                onPress={() => setShowResumeModal(false)}
              >
                <Text style={[styles.modalBtnText, styles.modalBtnTextPrimary]}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Quiz Challenge</Text>
          <Text style={styles.meta}>
            Question {currentIndex + 1} of {quizLength}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressFill,
              { width: `${percent}%`, backgroundColor: colors.primary300 },
            ]}
          />
        </View>
      </View>

      <View style={styles.questionArea}>
        <QuestionCard question={currentQuestion.question} />
      </View>

      <View style={styles.answersArea}>
        <View style={styles.grid}>
          {currentAnswers.map((answer) => (
            <View key={answer.text} style={styles.cell}>
              <AnswerCard
                text={answer.text}
                variant={getVariantForAnswer(answer.text, answer.isCorrect)}
                disabled={selectedAnswerId !== undefined}
                onPress={() => handlePick(answer)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Styles remain identical to your original code...
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { marginTop: 10, marginBottom: 25 },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  meta: { fontSize: 14, fontWeight: '700', color: '#94A3B8' },
  progressContainer: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  questionArea: { flex: 0.45, justifyContent: 'center' },
  answersArea: { flex: 0.55, paddingTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cell: { width: '48%' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: { width: '100%', borderRadius: 18, backgroundColor: '#FFFFFF', padding: 18 },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  modalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    lineHeight: 20,
    marginBottom: 14,
  },
  modalButtonsRow: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end' },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, borderWidth: 2 },
  modalBtnSecondary: { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' },
  modalBtnText: { fontSize: 14, fontWeight: '900' },
  modalBtnTextPrimary: { color: '#FFFFFF' },
  modalBtnTextSecondary: { color: '#0F172A' },
});

export default QuizPage;
