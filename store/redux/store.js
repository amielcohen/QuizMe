import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourite';
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    favouriteQuiz: favouritesReducer,
    auth: authReducer,
  },
});
