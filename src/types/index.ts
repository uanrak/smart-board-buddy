
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt?: Date;
  dueDate?: Date;
}

export interface Board {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}
