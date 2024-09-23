export type Task = {
  id: string;
  name: string;
  description: string;
  priority: string;
  category: string;
  due_date: string;
  user: string;
};
export type CreateTaskFormData = {
  name: string;
  description: string;
  priority: string;
  category: string;
  due_date: string;
  user: string;
};
