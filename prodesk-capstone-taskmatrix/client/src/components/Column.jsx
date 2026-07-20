import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";

export default function Column({ column, tasks, projectId, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id, data: { column: column.id } });

  return (
    <div ref={setNodeRef} className={`flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 ${isOver ? "ring-2 ring-indigo-400" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{column.title}</h3>
        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">{tasks.length}</span>
      </div>
      <div className="space-y-2 min-h-[100px]">{children}</div>
    </div>
  );
}