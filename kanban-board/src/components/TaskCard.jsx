
import { Draggable } from '@hello-pangea/dnd';
import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const priorityColors = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function TaskCard({ task, index, onEdit, onDelete, onMove }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group p-5 bg-white/[0.03] border border-white/5 rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 hover:shadow-xl hover:-translate-y-1 ${
            snapshot.isDragging ? 'shadow-2xl border-blue-500/50 bg-slate-800/80 scale-[1.05] rotate-2 z-50 backdrop-blur-lg' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-lg border font-bold uppercase tracking-wider ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <button 
                onClick={() => onEdit(task)} 
                className="p-1.5 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors"
                title="Edit"
              >
                <FiEdit2 size={14} />
              </button>
              <button 
                onClick={() => onDelete(task.id)} 
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-400/10 transition-colors"
                title="Delete"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>

          <p className="text-slate-100 font-semibold leading-relaxed mb-6 group-hover:text-white transition-colors">
            {task.title}
          </p>

          <div className="flex justify-between items-center border-t border-white/5 pt-4">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-darkBg flex items-center justify-center text-[10px] font-bold text-slate-400">?</div>
            </div>
            
            <div className="flex items-center gap-2">
              {task.status !== 'todo' && (
                <button 
                  onClick={() => onMove(task.id, 'left')}
                  className="p-1 text-slate-500 hover:text-slate-200 transition-colors"
                  title="Move Left"
                >
                  <FiChevronLeft size={18} />
                </button>
              )}
              {task.status !== 'done' && (
                <button 
                  onClick={() => onMove(task.id, 'right')}
                  className="p-1 text-slate-500 hover:text-slate-200 transition-colors"
                  title="Move Right"
                >
                  <FiChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}