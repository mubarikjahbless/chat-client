import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInService } from '../services/logged-in.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedInGuard implements CanActivate {
  constructor(private loggedInSvc: LoggedInService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loggedInSvc.loggedIn$.pipe(map(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/select-room']);
      }
      return !loggedIn;
    }));
  }
}
