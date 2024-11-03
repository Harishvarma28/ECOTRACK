import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();
    
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // console.log("error in catcherror block", err);
          if (err.status === 401) {
            // Call refresh token logic here

           
              // debugger
              this.authService.refreshAccessToken();
            
            
            // Now, you can handle the response after refreshing the token
            const newAccessToken = this.authService.getAccessToken();
            
            if (newAccessToken) {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
              return next.handle(request);
            }
          }
          else if(err.status===4001)
          {
            this.authService.logout();
            return this.errorhandling(err)
          }
          // If the error is not 401 or the refresh token logic fails, re-throw the error
          return this.errorhandling(err)
        })
      );
  }
  
  private errorhandling(err: any) {
    // console.log("Errorhandling...in interceptor");
    let errorMessage = '';
    // console.log("Error handling",err)
    if (err.error instanceof ErrorEvent) {
      // clientside
      errorMessage = `Error: ${err.message}`;
      // console.log("Error message(client side error)", errorMessage, err.error);
    } else {
      // serverside
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
      // console.log("error", err);
      if (err.status == 401) {
        return throwError(401);
      }
      // this.toasterservice.showErrorToast(errorMessage);
    }
    return throwError(errorMessage);
  }
}
