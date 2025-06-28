import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { TaskBoard } from '@/components/TaskBoard'
import { FloatingChat } from '@/components/FloatingChat'
import { Board, Task } from '@/types'
import NotionRenderer from '@/components/NotionRenderer'
import { NotionDataResponse } from '@/interfaces/Notion'
import { notionService } from '@/services/notion'

const initialBoards: Board[] = [
  {
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
  {
    id: '2',
    name: 'Personal',
    color: 'bg-green-500',
    tasks: [
      {
        id: '4',
        title: 'Hacer ejercicio',
        description: 'Rutina de 30 minutos',
        status: 'todo',
        priority: 'medium',
      },
      {
        id: '5',
        title: 'Comprar groceries',
        description: 'Lista de compras semanal',
        status: 'todo',
        priority: 'low',
      },
      {
        id: '6',
        title: 'Leer capítulo libro',
        description: 'Continuar con el libro actual',
        status: 'in-progress',
        priority: 'low',
      },
    ],
  },
  {
    id: '3',
    name: 'Estudios',
    color: 'bg-purple-500',
    tasks: [
      {
        id: '7',
        title: 'Completar curso React',
        description: 'Módulos 8-10 pendientes',
        status: 'in-progress',
        priority: 'high',
      },
      {
        id: '8',
        title: 'Proyecto final',
        description: 'Aplicación web completa',
        status: 'todo',
        priority: 'high',
      },
    ],
  },
]

const blocks = [
  {
    id: 'abc123',
    type: 'heading_1',
    heading_1: {
      rich_text: [{ plain_text: 'Título principal' }],
    },
  },
  {
    id: 'def456',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ plain_text: 'Este es el contenido de un párrafo.' }],
    },
  },
]

const Index = () => {
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [selectedBoardId, setSelectedBoardId] = useState('1')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notionData, setNotionData] = useState<NotionDataResponse | null>(null)

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const databases = await notionService.getDatabases()
        if (databases.length) {
          const boardsFromNotion = databases.map((db, idx) => ({
            id: db.id,
            name: db.title?.[0]?.plain_text || `Database ${idx + 1}`,
            color: initialBoards[idx % initialBoards.length].color,
            tasks: [],
          }))
          setBoards(boardsFromNotion)
          setSelectedBoardId(boardsFromNotion[0].id)
        }
      } catch (error) {
        console.error('Error fetching boards:', error)
        setBoards(initialBoards)
      }
    }

    fetchBoards()
  }, [])

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await notionService.getDatabasePages(selectedBoardId)
        setNotionData(data)
      } catch (e) {
        console.error('Error fetching pages', e)
      }
    }

    fetchPages()
  }, [selectedBoardId])

  const selectedBoard = boards.find((board) => board.id === selectedBoardId)

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === selectedBoardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
              ),
            }
          : board
      )
    )
  }

  const addTask = (title: string, description: string = '') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'todo',
      priority: 'medium',
    }

    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === selectedBoardId
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar
          boards={boards}
          selectedBoardId={selectedBoardId}
          onSelectBoard={setSelectedBoardId}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex-1 flex flex-col">
          <Header
            boardName={selectedBoard?.name || 'Tablero'}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onAddTask={addTask}
          />

          <main className="flex-1 p-6">
            {selectedBoard && (
              <TaskBoard
                board={selectedBoard}
                onMoveTask={moveTask}
                onAddTask={addTask}
              />
            )}
            {notionData && <NotionRenderer blocks={notionData} />}
          </main>
        </div>

        <FloatingChat />
      </div>
    </DndProvider>
  )
}

export default Index
