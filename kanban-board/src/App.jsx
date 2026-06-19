import { useState, useEffect } from 'react';
import Board from './components/Board';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import { FiPlus, FiTrello } from 'react-icons/fi'; // FiKanban ki jagah FiTrello liya

const LOCAL_STORAGE_KEY = 'kanban_board_tasks';

const defaultTasks = [
  { id: 1, title: "Create modular dashboard wireframes", status: "todo", priority: "high" },
  { id: 2, title: "Integrate tailwind processing config options", status: "inprogress", priority: "medium" },
  { id: 3, title: "Initialize application repository structure via Vite", status: "done", priority: "low" }
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultTasks;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateOrUpdateTask = (formData) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...formData } : t));
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        ...formData
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleManualMove = (taskId, direction) => {
    const statusWorkflow = ['todo', 'inprogress', 'done'];
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const currentIdx = statusWorkflow.indexOf(t.status);
      const nextIdx = direction === 'right' ? currentIdx + 1 : currentIdx - 1;
      
      if (nextIdx >= 0 && nextIdx < statusWorkflow.length) {
        return { ...t, status: statusWorkflow[nextIdx] };
      }
      return t;
    }));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/5">
              <FiTrello size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Sprint Kanban
              </h1>
              <p className="text-slate-400 font-medium">Streamline your workflow with precision.</p>
            </div>
          </div>
          
          <button
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 font-semibold px-6 py-3 rounded-2xl text-white transition-all duration-200 transform active:scale-95 shadow-xl shadow-blue-600/20"
          >
            <FiPlus size={20} className="group-hover:rotate-90 transition-transform duration-200" /> 
            <span>New Task</span>
          </button>
        </header>

        {/* Action Controls Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between sm:items-center glass p-4 rounded-2xl border border-white/5">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="px-4 py-2 bg-slate-800/40 rounded-xl border border-white/5 text-sm font-medium text-slate-400">
            Total Tasks: <span className="text-blue-400">{filteredTasks.length}</span>
          </div>
        </div>

        {/* Board Section */}
        <Board
          tasks={filteredTasks}
          setTasks={setTasks}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
          onMove={handleManualMove}
        />

        {/* Form Modal */}
        {isFormOpen && (
          <TaskForm
            key={editingTask ? editingTask.id : 'new'}
            onSubmit={handleCreateOrUpdateTask}
            onClose={() => { setIsFormOpen(false); setEditingTask(null); }}
            initialTask={editingTask}
          />
        )}
      </div>
    </div>
  );
}