
import { useState } from 'react';
import { Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface HeaderProps {
  boardName: string;
  onToggleSidebar: () => void;
  onAddTask: (title: string, description: string) => void;
}

export const Header = ({ boardName, onToggleSidebar, onAddTask }: HeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle, taskDescription);
      setTaskTitle('');
      setTaskDescription('');
      setIsDialogOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planificador IA</h1>
          <p className="text-sm text-gray-600">Tablero: {boardName}</p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Nueva Tarea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Título de la tarea"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Textarea
              placeholder="Descripción (opcional)"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">
                Crear Tarea
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
