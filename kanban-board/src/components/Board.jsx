
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';

const COLUMNS = ['todo', 'inprogress', 'done'];

export default function Board({ tasks, setTasks, onEdit, onDelete, onMove }) {
  
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = Array.from(tasks);
    const draggedTaskIndex = updatedTasks.findIndex(t => String(t.id) === draggableId);
    if (draggedTaskIndex === -1) return;

    const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
    
    // Change state status structure when shifting across columns
    draggedTask.status = destination.droppableId;

    // Gather tasks currently in the target column
    const destinationColumnTasks = updatedTasks.filter(t => t.status === destination.droppableId);
    const insertBeforeTask = destinationColumnTasks[destination.index];
    
    let targetIndex = updatedTasks.length;
    if (insertBeforeTask) {
      targetIndex = updatedTasks.findIndex(t => t.id === insertBeforeTask.id);
    }

    updatedTasks.splice(targetIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start overflow-x-auto pb-4">
        {COLUMNS.map((columnId) => {
          const columnTasks = tasks.filter((task) => task.status === columnId);
          return (
            <Column
              key={columnId}
              columnId={columnId}
              tasks={columnTasks}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}