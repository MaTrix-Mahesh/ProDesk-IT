
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const columnTitles = {
  todo: { label: 'To Do', color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
  inprogress: { label: 'In Progress', color: 'from-amber-400 to-orange-600', shadow: 'shadow-amber-500/20' },
  done: { label: 'Done', color: 'from-emerald-400 to-teal-600', shadow: 'shadow-emerald-500/20' },
};

export default function Column({ columnId, tasks, onEdit, onDelete, onMove }) {
  return (
    <div className="glass rounded-3xl p-5 flex flex-col h-[calc(100vh-14rem)] min-w-[320px] transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 group/column">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${columnTitles[columnId].color} ${columnTitles[columnId].shadow} shadow-lg`} />
          <h3 className="font-bold text-slate-100 text-lg tracking-tight uppercase text-xs">{columnTitles[columnId].label}</h3>
        </div>
        <div className="bg-white/5 text-slate-400 px-3 py-1 rounded-lg text-xs font-bold border border-white/5">
          {tasks.length}
        </div>
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto custom-scrollbar pr-2 rounded-xl transition-all duration-300 ${
              snapshot.isDraggingOver ? 'bg-white/[0.03]' : ''
            }`}
          >
            <div className="flex flex-col gap-4">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onMove={onMove}
                />
              ))}
            </div>
            {provided.placeholder}
            
            {tasks.length === 0 && (
              <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-sm text-slate-500 transition-colors group-hover/column:border-white/10 group-hover/column:text-slate-400">
                <p>No tasks yet</p>
                <p className="text-[10px] mt-1 opacity-50">Drop here to move</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}