export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type Filter = 'All' | 'Active' | 'Completed';