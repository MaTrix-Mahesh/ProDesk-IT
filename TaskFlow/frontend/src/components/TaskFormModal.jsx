import { useState, useEffect } from 'react';

const TaskFormModal = ({ open, task, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill form when editing an existing task or reset when opening for create
  useEffect(() => {
    if (open) {
      setError('');
      if (task) {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'Pending',
          priority: task.priority || 'Medium',
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        });
      } else {
        setFormData({
          title: '',
          description: '',
          status: 'Pending',
          priority: 'Medium',
          dueDate: '',
        });
      }
    }
  }, [open, task]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    if (formData.title.trim().length < 3) {
      setError('Task title must be at least 3 characters');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel max-w-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="alert alert-error animate-scale-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="task-title" className="form-label">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="task-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="form-input"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about this task..."
              rows="3"
              className="form-textarea"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-status" className="form-label">
                Status
              </label>
              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">🔄 In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="task-priority" className="form-label">
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="task-dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="task-dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {task ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {task ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                  {task ? 'Update Task' : 'Create Task'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;