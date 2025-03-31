import React from 'react';
import { ListTodo } from 'lucide-react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { TaskFiltersComponent } from './components/TaskFilters';
import { updateTaskStatus } from './redux/slices/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);
  const editingTask = useSelector(state => state.tasks.editingTask);
  const filters = useSelector(state => state.filters);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    dispatch(updateTaskStatus({ id: taskId, status }));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'date') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <ListTodo size={32} color="#1976d2" />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Task Manager
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{ p: 3 }}>
              <TaskForm initialData={editingTask} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <TaskFiltersComponent />

            <Grid container spacing={2}>
              {['todo', 'inProgress', 'completed'].map((status) => (
                <Grid item xs={12} md={4} key={status}>
                  <Paper
                    sx={{ p: 2,width: '23vw' }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, status)}
                  >
                    <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
                      {status.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {filteredTasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                          <div
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                          >
                            <TaskCard task={task} />
                          </div>
                        ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
