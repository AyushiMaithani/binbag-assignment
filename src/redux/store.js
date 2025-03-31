import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import filtersReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});
