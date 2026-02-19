import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourite';
import authReducer from './auth';
import quizReducer from './quiz';

export const store = configureStore({
  reducer: {
    favouriteQuiz: favouritesReducer,
    auth: authReducer,
    quiz: quizReducer,
  },
});
