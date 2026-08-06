import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TaskFormModal from '../components/TaskFormModal';
import ConfirmationModal from '../components/ConfirmationModal';
import EmptyState, { ErrorState } from '../components/EmptyState';
import { TaskCardSkeleton, StatCardSkeleton, ActivitySkeleton } from '../components/Skeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Task modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Delete confirmation state
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Get user from localStorage
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);

  // Use the tasks hook for CRUD operations
  const { tasks, loading, error, success, fetchTasks, addTask, editTask, removeTask } = useTasks();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Open create modal
  const handleNewTaskClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Submit create/update
  const handleSubmitTask = async (formData) => {
    if (editingTask) {
      await editTask(editingTask._id, formData);
    } else {
      await addTask(formData);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Open delete confirmation
  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setDeleting(true);
    try {
      await removeTask(taskToDelete._id);
      setTaskToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    if (!deleting) setTaskToDelete(null);
  };

  // Stats calculations
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
    const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
    const highPriorityTasks = tasks.filter((t) => t.priority === 'High').length;
    const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date()).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      highPriorityTasks,
      overdueTasks,
      completionRate,
    };
  }, [tasks]);

  // Status helpers
  const getStatusStyles = (status) => {
    const styles = {
      'In Progress': 'bg-amber-50 text-amber-700 border-amber-100',
      'Pending': 'bg-slate-100 text-slate-600 border-slate-200',
      'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    };
    return styles[status] || styles['Pending'];
  };

  const getPriorityStyles = (priority) => {
    const styles = {
      'High': 'bg-rose-50 text-rose-700 border-rose-100',
      'Medium': 'bg-amber-50 text-amber-700 border-amber-100',
      'Low': 'bg-primary-50 text-primary-700 border-primary-100',
    };
    return styles[priority] || styles['Medium'];
  };

  const getStatusIcon = (status) => {
    const icons = {
      'In Progress': '🔄',
      'Pending': '⏳',
      'Completed': '✅',
    };
    return icons[status] || '⏳';
  };

  const getStatusDot = (status) => {
    const dots = {
      'In Progress': 'bg-amber-500',
      'Pending': 'bg-slate-400',
      'Completed': 'bg-emerald-500',
    };
    return dots[status] || 'bg-slate-400';
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFullDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Stat card configs
  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      icon: '📋',
      gradient: 'from-indigo-500 to-violet-500',
      ring: 'ring-indigo-100',
    },
    {
      label: 'Completed',
      value: stats.completedTasks,
      icon: '✅',
      gradient: 'from-emerald-500 to-teal-500',
      ring: 'ring-emerald-100',
    },
    {
      label: 'In Progress',
      value: stats.inProgressTasks,
      icon: '🔄',
      gradient: 'from-amber-500 to-orange-500',
      ring: 'ring-amber-100',
    },
    {
      label: 'Pending',
      value: stats.pendingTasks,
      icon: '⏳',
      gradient: 'from-slate-500 to-slate-600',
      ring: 'ring-slate-100',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          setSidebarOpen(false);
        }}
        open={sidebarOpen}
      />

      <div className="lg:pl-72">
        <Navbar
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNewTask={handleNewTaskClick}
        />

        <main className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Success/Error messages */}
          {success && (
            <div className="alert alert-success mb-6 animate-scale-in">
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="alert alert-error mb-6 animate-scale-in">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* DASHBOARD VIEW */}
          {activeView === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Welcome banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-200/50">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white rounded-full blur-2xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">
                      👋
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        Welcome back, {user.name?.split(' ')[0] || 'User'}!
                      </h1>
                      <p className="text-white/80 text-sm">Here's what's happening with your tasks today.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={handleNewTaskClick}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 text-sm font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-sm active:scale-[0.98]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create New Task
                    </button>
                    <button
                      onClick={() => setActiveView('stats')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Statistics
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {loading
                  ? [1, 2, 3, 4].map((i) => <StatCardSkeleton key={i} />)
                  : statCards.map((card) => (
                      <div
                        key={card.label}
                        className="card card-hover p-5 flex items-center gap-4 group"
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {card.icon}
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                          <p className="text-sm text-slate-500">{card.label}</p>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Recent activity */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                    <p className="text-sm text-slate-400">Your latest task updates</p>
                  </div>
                  <button
                    onClick={() => setActiveView('tasks')}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1"
                  >
                    View all
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {loading ? (
                  <ActivitySkeleton />
                ) : tasks.length === 0 ? (
                  <EmptyState
                    icon="📭"
                    title="No activities yet"
                    message="Create your first task to see activity updates here."
                    actionLabel="Create Task"
                    onAction={handleNewTaskClick}
                  />
                ) : (
                  <div className="divide-y divide-slate-100">
                    {tasks.slice(0, 5).map((task) => (
                      <div key={task._id} className="flex items-center gap-4 py-3 group">
                        <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(task.status)} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-primary-600 transition-colors">
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs text-slate-400">{task.status}</p>
                            <span className="text-slate-200">•</span>
                            <p className="text-xs text-slate-400 capitalize">{task.priority} priority</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">
                          {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Just now'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick overview */}
              {!loading && tasks.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Upcoming tasks */}
                  <div className="card p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Due</h2>
                    <div className="space-y-3">
                      {tasks
                        .filter((t) => t.dueDate && t.status !== 'Completed')
                        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                        .slice(0, 3)
                        .map((task) => (
                          <div key={task._id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate">{task.title}</p>
                              <p className="text-xs text-slate-400">{task.status}</p>
                            </div>
                            <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Progress overview */}
                  <div className="card p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Progress Overview</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Completion Rate</span>
                          <span className="text-sm font-semibold text-primary-600">{stats.completionRate}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all duration-500"
                            style={{ width: `${stats.completionRate}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="text-center">
                          <p className="text-xl font-bold text-emerald-600">{stats.completedTasks}</p>
                          <p className="text-xs text-slate-400">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-amber-600">{stats.inProgressTasks}</p>
                          <p className="text-xs text-slate-400">In Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-slate-500">{stats.pendingTasks}</p>
                          <p className="text-xs text-slate-400">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TASKS VIEW */}
          {activeView === 'tasks' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
                  <p className="text-sm text-slate-400 mt-1">
                    {stats.totalTasks} total tasks • {stats.completedTasks} completed
                  </p>
                </div>
                <button onClick={handleNewTaskClick} className="btn btn-primary hidden sm:inline-flex">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New Task
                </button>
              </div>

              <div className="sm:hidden mb-4">
                <button onClick={handleNewTaskClick} className="btn btn-primary w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New Task
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => <TaskCardSkeleton key={i} />)}
                </div>
              ) : error && tasks.length === 0 ? (
                <div className="card">
                  <ErrorState message={error} onRetry={fetchTasks} />
                </div>
              ) : tasks.length === 0 ? (
                <div className="card">
                  <EmptyState
                    icon="📝"
                    title="No tasks yet"
                    message="Get started by creating your first task. It only takes a few seconds!"
                    actionLabel="Create Your First Task"
                    onAction={handleNewTaskClick}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tasks.map((task) => (
                    <div key={task._id} className="card card-hover p-5 flex flex-col group">
                      {/* Task header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl ${getPriorityStyles(task.priority)} flex items-center justify-center text-lg shrink-0`}>
                          {getStatusIcon(task.status)}
                        </div>
                        <button
                          onClick={() => handleDeleteClick(task)}
                          className="p-2 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Delete task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Task content */}
                      <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                        {task.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
                        {task.description || 'No description provided.'}
                      </p>

                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`badge ${getStatusStyles(task.status)}`}>
                          {getStatusIcon(task.status)} {task.status}
                        </span>
                        <span className={`badge ${getPriorityStyles(task.priority)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-primary-500'}`} />
                          {task.priority}
                        </span>
                      </div>

                      {/* Due date */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(task.dueDate)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(task)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STATISTICS VIEW */}
          {activeView === 'stats' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Statistics</h1>
                <p className="text-sm text-slate-400 mt-1">Track your productivity and progress</p>
              </div>

              {/* Main stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total Tasks', value: stats.totalTasks, icon: '📋', gradient: 'from-indigo-500 to-violet-500' },
                  { label: 'Completed', value: stats.completedTasks, icon: '✅', gradient: 'from-emerald-500 to-teal-500' },
                  { label: 'In Progress', value: stats.inProgressTasks, icon: '🔄', gradient: 'from-amber-500 to-orange-500' },
                  { label: 'Pending', value: stats.pendingTasks, icon: '⏳', gradient: 'from-slate-500 to-slate-600' },
                  { label: 'High Priority', value: stats.highPriorityTasks, icon: '🔴', gradient: 'from-rose-500 to-red-500' },
                  { label: 'Overdue', value: stats.overdueTasks, icon: '⚠️', gradient: 'from-amber-500 to-yellow-500' },
                ].map((card) => (
                  <div key={card.label} className="card card-hover p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                      <p className="text-sm text-slate-500">{card.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion rate */}
              <div className="card p-6 mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Completion Rate</h2>
                <div className="flex items-center gap-6 mb-4">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${stats.completionRate * 2.64} 264`}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-900">{stats.completionRate}%</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    {[
                      { label: 'Completed', value: stats.completedTasks, color: 'bg-emerald-500', total: stats.totalTasks },
                      { label: 'In Progress', value: stats.inProgressTasks, color: 'bg-amber-500', total: stats.totalTasks },
                      { label: 'Pending', value: stats.pendingTasks, color: 'bg-slate-400', total: stats.totalTasks },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600">{item.label}</span>
                          <span className="text-sm font-semibold text-slate-800">
                            {item.value}/{item.total}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                            style={{ width: item.total > 0 ? `${(item.value / item.total) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status breakdown */}
              {stats.totalTasks > 0 && (
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Task Status Breakdown</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Completed', value: stats.completedTasks, color: 'bg-emerald-500' },
                      { label: 'In Progress', value: stats.inProgressTasks, color: 'bg-amber-500' },
                      { label: 'Pending', value: stats.pendingTasks, color: 'bg-slate-400' },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className={`w-3 h-3 mx-auto rounded-full ${item.color} mb-2`} />
                        <p className="text-xl font-bold text-slate-900">{item.value}</p>
                        <p className="text-xs text-slate-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFILE VIEW */}
          {activeView === 'profile' && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">User Profile</h1>
                <p className="text-sm text-slate-400 mt-1">Manage your account information</p>
              </div>

              <div className="card p-8 overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary-600 via-violet-600 to-purple-600" />
                <div className="absolute inset-x-0 top-0 h-24 opacity-20">
                  <div className="absolute top-4 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                  <div className="absolute top-0 right-20 w-24 h-24 bg-white rounded-full blur-xl" />
                </div>

                <div className="relative flex flex-col items-center pt-8">
                  <div className="avatar w-24 h-24 text-2xl border-4 border-white shadow-xl mb-4">
                    {getInitials(user.name)}
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">{user.name || 'User'}</h2>
                  <p className="text-slate-500 text-sm mb-6">{user.email || ''}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
                    <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                      <p className="text-xl font-bold text-primary-600">{stats.totalTasks}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Total Tasks</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                      <p className="text-xl font-bold text-emerald-600">{stats.completedTasks}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Completed</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                      <p className="text-xl font-bold text-amber-600">{stats.completionRate}%</p>
                      <p className="text-xs text-slate-400 mt-0.5">Completion Rate</p>
                    </div>
                  </div>

                  <div className="w-full bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Member Since</span>
                      <span className="text-sm font-medium text-slate-800">
                        {user.createdAt ? formatFullDate(user.createdAt) : formatFullDate(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Account Type</span>
                      <span className="badge badge-primary">Free</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Role</span>
                      <span className="badge badge-slate">Administrator</span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-danger-outline w-full mt-4"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Task Form Modal (Create/Edit) */}
      <TaskFormModal
        open={isModalOpen}
        task={editingTask}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={!!taskToDelete}
        title="Delete Task?"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleting}
      />
    </div>
  );
};

export default Dashboard;