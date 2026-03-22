import { Component } from '@angular/core';
import { Todo } from './todo/todo';

@Component({
  selector: 'app-root',
  imports: [Todo],
  template: '<app-todo></app-todo>',
})
export class App {}