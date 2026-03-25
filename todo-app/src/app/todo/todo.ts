import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'All' | 'Active' | 'Completed';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  tasks: Task[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build Todo App', completed: true },
  ];

  newTaskTitle = '';
  activeFilter: Filter = 'All';
  nextId = 3;

  get filteredTasks(): Task[] {
    return this.tasks.filter((task) => {
      if (this.activeFilter === 'Active') return !task.completed;
      if (this.activeFilter === 'Completed') return task.completed;
      return true;
    });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;
    this.tasks = [...this.tasks, { id: this.nextId++, title, completed: false }];
    this.newTaskTitle = '';
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  setFilter(filter: Filter): void {
    this.activeFilter = filter;
  }
}