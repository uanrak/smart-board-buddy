
import { TaskColumn } from '@/components/TaskColumn';
import { Board, Task } from '@/types';

interface TaskBoardProps {
  board: Board;
  onMoveTask: (taskId: string, newStatus: Task['status']) => void;
  onAddTask: (title: string, description: string) => void;
}

const columns = [
  { id: 'todo', title: 'Por Hacer', status: 'todo' as const },
  { id: 'in-progress', title: 'En Curso', status: 'in-progress' as const },
  { id: 'done', title: 'Hecho', status: 'done' as const },
];

export const TaskBoard = ({ board, onMoveTask, onAddTask }: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          title={column.title}
          status={column.status}
          tasks={board.tasks.filter(task => task.status === column.status)}
          onMoveTask={onMoveTask}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
};
