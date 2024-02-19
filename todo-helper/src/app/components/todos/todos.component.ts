import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  public form!: FormGroup;

  public todos: Todo[] = [];

  public ngOnInit(): void {
    this.initForm()
  }

  public initForm(): void {
    this.form = new FormGroup<any>({
      todo: new FormControl('')
    })

  }

  public submit(): void {
    const todo: Todo = {
      title: this.form.value.todo,
      isCompleted: false,
      id: this.uuidv4()
    };

    this.todos.push(todo);
  }

  public toggleTodo(event: Event, item: Todo): void {
    item.isCompleted = !item.isCompleted;
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
      const r: number = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
