import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../Features/services/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

 sent_requests:number=0
  constructor(private _loaderservice:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  this.sent_requests++;
  //console.log("Loader interceptor")
   this._loaderservice.setloader(true)
    return next.handle(request).pipe(
      finalize(() => {
        this.sent_requests--;
        if ( this.sent_requests == 0) {
          setTimeout(() => {
            this._loaderservice.setloader(false);
          }, 500);

        }
      }))
  }
}
