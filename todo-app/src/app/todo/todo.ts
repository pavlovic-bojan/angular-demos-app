import { Component, signal, computed } from '@angular/core';
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
  tasks = signal<Task[]>([
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build Todo App', completed: true },
  ]);

  newTaskTitle = '';
  activeFilter = signal<Filter>('All');
  nextId = 3;

  filteredTasks = computed(() => {
    const filter = this.activeFilter();
    return this.tasks().filter((task) => {
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    });
  });

  addTask() {
    const title = this.newTaskTitle.trim();
    if (!title) return;
    this.tasks.update((tasks) => [
      ...tasks,
      { id: this.nextId++, title, completed: false },
    ]);
    this.newTaskTitle = '';
  }

  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  setFilter(filter: Filter) {
    this.activeFilter.set(filter);
  }
}