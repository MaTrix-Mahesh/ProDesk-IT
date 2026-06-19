import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function TaskForm({ onSubmit, onClose, initialTask = null }) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'medium');
  const [status, setStatus] = useState(initialTask?.status || 'todo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, priority, status });
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="bg-darkCard border border-white/10 w-full max-w-lg p-8 rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <FiX size={20} />
        </button>
        
        <h2 className="text-2xl font-extrabold mb-8 text-white tracking-tight">
          {initialTask ? 'Refine Task' : 'New Mission'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Task Description</label>
            <textarea
              required
              rows="3"
              placeholder="What's the goal?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="low" className="bg-darkCard">Low Priority</option>
                <option value="medium" className="bg-darkCard">Medium Priority</option>
                <option value="high" className="bg-darkCard">High Priority</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Workflow Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="todo" className="bg-darkCard">To Do</option>
                <option value="inprogress" className="bg-darkCard">In Progress</option>
                <option value="done" className="bg-darkCard">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 text-sm font-bold text-slate-400 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-[2] px-6 py-4 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              {initialTask ? 'Save Changes' : 'Launch Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}