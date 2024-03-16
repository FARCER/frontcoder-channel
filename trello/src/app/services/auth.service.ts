import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRegisterData } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activeUser: UserRegisterData| null;

  constructor() {
    this.checkIsAuth();
  }

  public isAdmin(): boolean {
    return this.activeUser?.login === 'Admin';
  }

  public getUsers(): UserRegisterData[] {
    return !!window.localStorage.getItem('users')
      ? JSON.parse(window.localStorage.getItem('users') || '')
      : [];
  }

  private checkIsAuth(): void {
    const activeUser: UserRegisterData | undefined | null = this.getUsers().length
      ? this.getUsers().find((user: UserRegisterData) => user.isAuth) : null;
    this.activeUser = activeUser as UserRegisterData;

    this.isAuth$.next(!!activeUser);
  }

}
