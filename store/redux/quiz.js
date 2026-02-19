import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionsByQuizId: {},
};

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initQuizIfNeeded(state, action) {
      const { quizId, questions, title, color } = action.payload; // מקבלים גם כותרת וצבע
      if (!state.sessionsByQuizId[quizId]) {
        state.sessionsByQuizId[quizId] = {
          currentIndex: 0,
          finished: false,
          correctCount: 0,
          answeredByIndex: {},
          shuffledAnswersByIndex: questions.map((q) => shuffle(q.answers)),
          // שומרים את המידע כאן - ככה הוא נגיש לכל עמוד בעתיד
          quizTitle: title,
          quizColor: color,
          updatedAt: Date.now(),
        };
      }
    },

    resetQuizSession(state, action) {
      const { quizId } = action.payload;
      delete state.sessionsByQuizId[quizId];
    },

    selectAnswer(state, action) {
      const { quizId, questionIndex, selectedAnswerId, isCorrect } = action.payload;
      const session = state.sessionsByQuizId[quizId];

      if (!session || session.answeredByIndex[questionIndex] !== undefined) return;

      session.answeredByIndex[questionIndex] = { selectedAnswerId, isCorrect };
      if (isCorrect) session.correctCount += 1;
      session.updatedAt = Date.now();
    },

    goNext(state, action) {
      const { quizId, quizLength } = action.payload;
      const session = state.sessionsByQuizId[quizId];

      if (!session || session.finished) return;

      const nextIndex = session.currentIndex + 1;
      if (nextIndex >= quizLength) {
        session.finished = true;
      } else {
        session.currentIndex = nextIndex;
      }
      session.updatedAt = Date.now();
    },
  },
});

export const { initQuizIfNeeded, resetQuizSession, selectAnswer, goNext } = quiz.actions;

export default quiz.reducer;
