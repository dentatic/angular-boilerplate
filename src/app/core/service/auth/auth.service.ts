import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

const keys = {
  USER: 'user',
  TOKEN: 'token'
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<any | null>;
  private token: string;
  private _isLoggedIn: boolean
  user$: Observable<any | null>;

  constructor(private api:ApiService) {
    // this.authActions = new AuthActions(http)
    this.token = JSON.parse(localStorage.getItem(keys.TOKEN) || 'null')
    const user = JSON.parse(localStorage.getItem(keys.USER) || 'null')
    this.userSubject = new BehaviorSubject<any | null>(user);
    this.user$ = this.userSubject.asObservable();
    this._isLoggedIn = this.token && user;
  }

  get userValue() {
    return this.userSubject.getValue()
  }
  get tokenValue() {
    return this.token
  }
  get isLoggedIn() {
    return this._isLoggedIn
  }

  login(user: any) {
    this.api.createEntity<any>('login',user).pipe(tap(data => {
      localStorage.setItem(keys.USER, JSON.stringify(data.user))
      localStorage.setItem(keys.TOKEN, JSON.stringify(data.token));
      this.userSubject.next(data.user);
      this.token = data.token
      this._isLoggedIn = true
    }))
  }

  logout() {
    localStorage.removeItem(keys.USER)
    localStorage.removeItem(keys.TOKEN)
    this.userSubject.next(null);
    this.token = ''
  }

}
