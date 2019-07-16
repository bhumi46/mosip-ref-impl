import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRedirectService } from './loginredirect.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private redirectService: LoginRedirectService,
                private router: Router,
                private headerService: HeaderService) { }
    // function which will be called for all http calls
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
        withCredentials : true
      });
        return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        console.log(event);
       // this.headerService.setUsername(event.body.response.userId);
       // this.headerService.setRoles(event.body.response.role);
      }
    }, err => {
        if (err instanceof HttpErrorResponse) {
        console.log(err.status);
        if (err.status === 401 || err.status === 403) {
          this.redirectService.redirect(window.location.href);
        } else {
          this.router.navigate(['/error', {errorMessage: err.message}]);
        }
    }}));
  }
}
