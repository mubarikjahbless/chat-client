import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { LoggedInService } from './logged-in.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser: any;

  get currentUser(): User {     
    return this._currentUser = this._currentUser || this.jwtHelper.decodeToken();
  }

  constructor(private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private loggedInSvc: LoggedInService) { } 

  login(credentials) {
    this.http.post<any>(environment.apiUrl + 'auth/login', credentials).subscribe((response) => { 
           
      sessionStorage.setItem('user_token', response.data.token);
      this.loggedInSvc.loggedIn$.next(true);
      this.router.navigate(['/chat']);

    });
  }

  logout() { 
    this.http.post(environment.apiUrl + 'auth/logout', null).subscribe(resp => {
      sessionStorage.removeItem('user_token');
      this.loggedInSvc.loggedIn$.next(false);
      this.router.navigate(['/login']);

    });
  }

  signUp(credentials) { 
    this.http.post<{ token: string }>(environment.apiUrl + 'auth/sign-up', credentials).subscribe(() => {
      this.router.navigate(['/login']);

    });
  }

  getUsers(): Observable<User[]> {
   return this.http.get<User[]>(environment.apiUrl+'auth/users').pipe(map((data)=>data['data']))
  }
}
