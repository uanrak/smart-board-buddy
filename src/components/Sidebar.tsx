
import { Board } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  boards: Board[];
  selectedBoardId: string;
  onSelectBoard: (boardId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ boards, selectedBoardId, onSelectBoard, isOpen }: SidebarProps) => {
  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      isOpen ? "w-64" : "w-0 overflow-hidden"
    )}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tableros</h2>
        
        <div className="space-y-2">
          {boards.map((board) => (
            <Button
              key={board.id}
              variant={selectedBoardId === board.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-auto p-3",
                selectedBoardId === board.id 
                  ? "bg-blue-100 text-blue-900 hover:bg-blue-200" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => onSelectBoard(board.id)}
            >
              <div className={cn("w-3 h-3 rounded-full", board.color)} />
              <div className="text-left">
                <div className="font-medium">{board.name}</div>
                <div className="text-xs text-gray-500">
                  {board.tasks.length} tareas
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Estadísticas</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total tareas:</span>
              <span className="font-medium">
                {boards.reduce((acc, board) => acc + board.tasks.length, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Completadas:</span>
              <span className="font-medium text-green-600">
                {boards.reduce((acc, board) => 
                  acc + board.tasks.filter(task => task.status === 'done').length, 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>En progreso:</span>
              <span className="font-medium text-blue-600">
                {boards.reduce((acc, board) => 
                  acc + board.tasks.filter(task => task.status === 'in-progress').length, 0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
