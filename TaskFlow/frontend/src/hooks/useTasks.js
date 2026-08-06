import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create a new task
  const addTask = async (taskData) => {
    const data = await createTask(taskData);
    setTasks((prev) => [data.task, ...prev]);
    setSuccess('Task created successfully');
    setTimeout(() => setSuccess(''), 3000);
    return data.task;
  };

  // Update an existing task
  const editTask = async (id, taskData) => {
    const data = await updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
    setSuccess('Task updated successfully');
    setTimeout(() => setSuccess(''), 3000);
    return data.task;
  };

  // Delete a task (optimistic UI)
  const removeTask = async (id) => {
    // Optimistically remove from state
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setSuccess('Task deleted successfully');
    setTimeout(() => setSuccess(''), 3000);

    try {
      await deleteTask(id);
    } catch (err) {
      // Rollback on failure
      setError(err.response?.data?.message || 'Failed to delete task');
      fetchTasks();
      setTimeout(() => setError(''), 3000);
    }
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return {
    tasks,
    loading,
    error,
    success,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    clearMessages,
  };
};

export default useTasks;