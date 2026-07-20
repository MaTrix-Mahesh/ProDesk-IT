import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, MoreHorizontal } from "lucide-react";
import api from "../services/api";
import { toast } from "sonner";
import TaskCard from "../components/TaskCard";
import Column from "../components/Column";

const COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "in_review", title: "In Review" },
  { id: "done", title: "Done" },
];

export default function BoardPage() {
  const { projectId } = useParams();
  const [activeTask, setActiveTask] = useState(null);
  const queryClient = useQueryClient();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => api.get(`/tasks/project/${projectId}`).then((r) => r.data.data),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => api.put(`/tasks/${id}`, { status }).then((r) => r.data.data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }); toast.success("Task moved"); },
    onError: (err) => toast.error(err.response?.data?.message || "Failed"),
  });

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t._id === event.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const overColumn = over.data?.current?.column || COLUMNS.find((c) => c.id === over.id)?.id || over.id;
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.status !== overColumn) {
      updateStatus.mutate({ id: taskId, status: overColumn });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          return (
            <Column key={column.id} column={column} tasks={columnTasks} projectId={projectId}>
              <SortableContext items={columnTasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
                {columnTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </SortableContext>
            </Column>
          );
        })}
      </div>
      <DragOverlay>{activeTask ? <TaskCard task={activeTask} isOverlay /> : null}</DragOverlay>
    </DndContext>
  );
}