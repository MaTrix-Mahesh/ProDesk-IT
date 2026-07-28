const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// @desc    Get all tasks (Protected)
// @route   GET /api/tasks
router.get('/', protect, getTasks);

// @desc    Create a new task (Protected)
// @route   POST /api/tasks
router.post('/', protect, createTask);

// @desc    Update a task (Protected)
// @route   PUT /api/tasks/:id
router.put('/:id', protect, updateTask);

// @desc    Delete a task (Protected)
// @route   DELETE /api/tasks/:id
router.delete('/:id', protect, deleteTask);

module.exports = router;
