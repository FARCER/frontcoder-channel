import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { UserRegisterData } from './interfaces';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButton, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
  }

  public logout(): void {
    const users: UserRegisterData[] = this.authService.getUsers();
    users.map((user: UserRegisterData) => {
      if (user.login === this.authService.activeUser?.login) {
        user.isAuth = false;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users));

    this.router.navigateByUrl('auth/login');
    this.authService.activeUser = null;
    this.authService.isAuth$.next(false);
  }
}
