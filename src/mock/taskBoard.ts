import { Board, Task } from '@/types'

export interface TaskBoardProps {
  board: Board
  onMoveTask: (taskId: string, newStatus: Task['status']) => void
  onAddTask: (title: string, description: string) => void
}

export const mockTaskBoardProps: TaskBoardProps = {
  board: {
    id: '1',
    name: 'Trabajo',
    color: 'bg-blue-500',
    tasks: [
      {
        id: '1',
        title: 'Revisar propuesta de cliente',
        description: 'Analizar los requerimientos del nuevo proyecto',
        status: 'todo',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Preparar presentación',
        description: 'Slides para la reunión de mañana',
        status: 'in-progress',
        priority: 'medium',
      },
      {
        id: '3',
        title: 'Llamada con equipo',
        description: 'Reunión semanal de seguimiento',
        status: 'done',
        priority: 'low',
      },
    ],
  },
  onMoveTask: () => {},
  onAddTask: () => {},
}
