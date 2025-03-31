import React, { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, setEditingTask } from '../redux/slices/tasksSlice';

export function TaskForm({ initialData }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      priority,
      status: initialData?.status || 'todo',
    };

    if (initialData) {
      dispatch(updateTask({ id: initialData.id, task: taskData }));
    } else {
      dispatch(addTask(taskData));
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center',width: '20vw' }}>
        <Typography variant="h6">
          {initialData ? 'Edit Task' : 'Add New Task'}
        </Typography>
        {initialData && (
          <IconButton onClick={() => dispatch(setEditingTask(null))} size="small">
            <X size={20} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          startIcon={<PlusCircle size={20} />}
          fullWidth
        >
          {initialData ? 'Update Task' : 'Add Task'}
        </Button>
      </Box>
    </form>
  );
}
