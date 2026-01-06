import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Busy } from '../_services/busy';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busy: Busy) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('HTTP IS WORKING:', req.method, req.url);
    this.busy.busy();
    console.log('HTTP IS DONE:', req.url);
    return next.handle(req).pipe(finalize(() => this.busy.idle()));

  }


}
