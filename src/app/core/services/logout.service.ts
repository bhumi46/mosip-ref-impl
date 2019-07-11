import { LoginRedirectService } from './loginredirect.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseModel } from './../models/response.model';
import { LogoutResponse } from './../models/logoutresponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, private router: Router, private redirectService: LoginRedirectService) { }

   logout() {
    this.http.delete('https://dev.mosip.io/r2/v1/authmanager/logout/user',
    { observe: 'response'}).subscribe((res: HttpResponse<ResponseModel<LogoutResponse>>) => {
     if (res.body.response.status === 'Success') {
       this.redirectService.redirect(window.location.origin + '/r2/admin-ui/');
    } else {
       window.alert(res.body.response.message);
     }
    },
    (error: HttpErrorResponse) => {
      window.alert(error.message);
    });
   }
}
