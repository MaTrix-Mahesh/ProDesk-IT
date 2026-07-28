const Task = require('../models/Task');

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    // Placeholder: Tasks will be queried from DB once Task model is created
    res.status(200).json({
      success: true,
      message: `Welcome ${req.user.name}, here are your tasks.`,
      tasks: [
        { id: 1, title: 'Complete Sprint 14', status: 'In Progress' },
        { id: 2, title: 'Deploy to Vercel/Render', status: 'Pending' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' });
    }

    // Placeholder: Will save to DB once Task model is created
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: { id: 3, title, description, status: status || 'Pending' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Placeholder: Will update in DB once Task model is created
    res.status(200).json({
      success: true,
      message: `Task ${id} updated successfully`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Placeholder: Will delete from DB once Task model is created
    res.status(200).json({
      success: true,
      message: `Task ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};