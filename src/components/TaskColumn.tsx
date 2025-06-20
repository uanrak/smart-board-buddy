
import { useDrop } from 'react-dnd';
import { Plus } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: Task['status']) => void;
  onAddTask: (title: string, description: string) => void;
}

export const TaskColumn = ({ title, status, tasks, onMoveTask, onAddTask }: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string }) => {
      onMoveTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getColumnColor = () => {
    switch (status) {
      case 'todo': return 'border-gray-300 bg-gray-50';
      case 'in-progress': return 'border-blue-300 bg-blue-50';
      case 'done': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const handleQuickAdd = () => {
    const title = prompt('Título de la tarea:');
    if (title) {
      onAddTask(title, '');
    }
  };

  return (
    <div
      ref={drop}
      className={cn(
        "bg-white rounded-lg border-2 border-dashed p-4 min-h-96 transition-colors",
        getColumnColor(),
        isOver && "border-blue-500 bg-blue-100"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          {title}
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </h3>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleQuickAdd}
          className="text-gray-600 hover:text-gray-900"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No hay tareas aquí</p>
            <p className="text-xs mt-1">Arrastra una tarea o crea una nueva</p>
          </div>
        )}
      </div>
    </div>
  );
};
