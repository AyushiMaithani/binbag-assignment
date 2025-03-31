import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('tasks') || '[]'),
  editingTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.task,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
      state.editingTask = null;
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    updateTaskStatus: (state, action) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, setEditingTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
