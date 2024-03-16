import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';
import { Task } from '../../interfaces';
import { TrelloListComponent } from '../trello-list/trello-list.component';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrelloComponent {
  public form: FormGroup;
  public users: UserRegisterData[];

  public tasks: Task[] = [];

  @ViewChild('trelloListComponent') private trelloListComponent: TrelloListComponent;

  constructor(
    private authService: AuthService
  ) {
    this.initForm();
    this.users = this.authService.getUsers().filter((us:UserRegisterData)=>us.login !== 'Admin');
    this.tasks = !!window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') || '')
      : [];
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public submit(): void {
    const task: Task = {
      task: this.form.value.task,
      worker: this.form.value.worker || this.authService.activeUser?.login,
      creator: this.authService.activeUser?.login || ''
    }
    this.tasks.push(task);
    this.form.reset();
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.trelloListComponent.reload$.next(null);
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      task: new FormControl(null, [Validators.required]),
      worker: new FormControl(null)
    })
  }
}
