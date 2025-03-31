import React from 'react';
import { Filter } from 'lucide-react';
import { Paper, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';

export function TaskFiltersComponent() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  return (
    <Paper sx={{ p: 2, mb: 3, width: '70vw'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={20} />
          <Typography variant="subtitle1" fontWeight="medium">
            Filters:
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => dispatch(setFilters({ ...filters, status: e.target.value }))}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.priority}
            label="Priority"
            onChange={(e) => dispatch(setFilters({ ...filters, priority: e.target.value }))}
          >
            <MenuItem value="">All Priority</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            label="Sort By"
            onChange={(e) =>
              dispatch(setFilters({ ...filters, sortBy: e.target.value }))
            }
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
