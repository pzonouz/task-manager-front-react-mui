export type Task = {
  id: string;
  name: string;
  description: string;
  priority: string;
  category: string;
  due_date: string;
  created_at: string;
  user: string;
  progress_percentage: number;
  completed: Boolean;
};
export type CreateTaskFormData = {
  name: string;
  description: string;
  priority: string;
  category: string;
  due_date: string;
  created_at: string;
  user: string;
  progress_percentage: number;
  completed: Boolean;
};
