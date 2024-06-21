import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { LoggedInService } from '../services/logged-in.service';
import { Router } from '@angular/router';


@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private loggedInSvc: LoggedInService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(catchError(async errorResp => {

      const message = errorResp.error && errorResp.error.message || errorResp.message;

      if (errorResp.status === 401) { // <1>
        this.loggedInSvc.loggedIn$.next(false);

        this.router.navigate(['/login']);
        return EMPTY;
      }

      return throwError(errorResp);
    }));
  }
}
