import React from 'react';
import { Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardContent, Typography, Box, IconButton, Chip } from '@mui/material';
import { deleteTask, setEditingTask, updateTaskStatus } from '../redux/slices/tasksSlice';
import { useDispatch } from 'react-redux';

export function TaskCard({ task }) {
  const dispatch = useDispatch();

  const priorityColors = {
    low: { bg: '#e8f5e9', color: '#2e7d32' },
    medium: { bg: '#fff3e0', color: '#f57c00' },
    high: { bg: '#ffebee', color: '#c62828' },
  };

  const statusColors = {
    todo: '#f5f5f5',
    inProgress: '#e3f2fd',
    completed: '#e8f5e9',
  };

  return (
    <Card
      sx={{
        bgcolor: statusColors[task.status],
        '&:hover': { boxShadow: 3 },
        transition: 'box-shadow 0.2s',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1,width: '20vw' }}>
          <Typography variant="h6" component="h3">
            {task.title}
          </Typography>
          <Box>
            <IconButton
              size="small"
              onClick={() => dispatch(setEditingTask(task))}
              sx={{ color: 'action.active' }}
            >
              <Edit2 size={18} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => dispatch(deleteTask(task.id))}
              sx={{ color: 'error.main' }}
            >
              <Trash2 size={18} />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={task.priority}
            size="small"
            sx={{
              bgcolor: priorityColors[task.priority].bg,
              color: priorityColors[task.priority].color,
            }}
          />

          <IconButton
            size="small"
            onClick={() =>
              dispatch(updateTaskStatus({
                id: task.id,
                status: task.status === 'completed' ? 'todo' : 'completed',
              }))
            }
            sx={{
              color: task.status === 'completed' ? 'success.main' : 'action.active',
            }}
          >
            <CheckCircle size={18} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
