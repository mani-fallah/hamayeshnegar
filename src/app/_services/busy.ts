import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class Busy {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {

    this.busyRequestCount++;
    this.spinnerService.show('global', {
      type: 'ball-beat',
      bdColor: 'rgba(0,0,0,0.8)',
      color: 'rgb(190, 96, 219)',
      size: 'medium'
    });
  }

  idle() {
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide('global');
    }
  }
}
