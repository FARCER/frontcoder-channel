import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { formFieldTypes } from '../../types';
import { AuthService } from '../../../../services/auth.service';
import { UserRegisterData } from '../../../../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router:Router
  ) {
    this.initForm();
  }

  public submit(): void {
    const users: UserRegisterData[] = this.authService.getUsers();
    const user: UserRegisterData | undefined = users.find((userData: UserRegisterData) => userData.email === this.form.value.email)

    if (!user) {
      this.matSnackBar.open('User not found')
      return;
    }

    if (this.form.value.password !== user?.password) {
      this.matSnackBar.open('Check your password');
      return;
    }

    users.map((userRegisterData: UserRegisterData) => {
      if (userRegisterData.login === user?.login) {
        userRegisterData.isAuth = true;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users));

    this.matSnackBar.open('Success');
    this.router.navigateByUrl('trello');
    this.authService.isAuth$.next(true);
    this.authService.activeUser = user;
  }

  public getErrorMessage(fieldName: formFieldTypes): string {
    const field: AbstractControl = this.form.controls[fieldName];
    const isRequired: boolean = field?.errors?.['required'];
    if (isRequired) {
      return 'Field is required';
    }
    return fieldName === 'email'
      ? 'Email is not-valid'
      : 'Min length is 5';
  }


  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }


}
