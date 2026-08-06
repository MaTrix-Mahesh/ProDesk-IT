const Task = require('../models/Task');
const mongoose = require('mongoose');

// Helper: Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    // Find task
    const task = await Task.findById(id);

    // Document not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ownership validation
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this task' });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Please provide a task title' });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({ message: 'Task title must be at least 3 characters' });
    }

    // Create task with userId from authenticated user
    const task = await Task.create({
      userId: req.user.id,
      title: title.trim(),
      description: description?.trim() || '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    // Find task
    const task = await Task.findById(id);

    // Document not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ownership validation
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this task' });
    }

    // Validate title if provided
    if (req.body.title !== undefined && req.body.title.trim().length < 3) {
      return res.status(400).json({ message: 'Task title must be at least 3 characters' });
    }

    // Build update object (only allow defined fields)
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title.trim();
    if (req.body.description !== undefined) updates.description = req.body.description.trim();
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (req.body.priority !== undefined) updates.priority = req.body.priority;
    if (req.body.dueDate !== undefined) updates.dueDate = req.body.dueDate;

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    // Find task
    const task = await Task.findById(id);

    // Document not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ownership validation
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this task' });
    }

    // Delete task
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};