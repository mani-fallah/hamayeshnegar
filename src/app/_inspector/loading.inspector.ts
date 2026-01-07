import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {finalize} from 'rxjs';
import {Busy} from '../_services/busy';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busy: Busy) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.busy.busy();

    return next.handle(req).pipe(finalize(() => this.busy.idle()));

  }


}
