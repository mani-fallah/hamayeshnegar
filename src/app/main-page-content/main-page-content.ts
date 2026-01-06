import { Component } from '@angular/core';
import {Router} from 'express';
import {Api} from '../_services/api';
import {RouterLink} from '@angular/router';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-main-page-content',
  imports: [
    RouterLink
  ],
  templateUrl: './main-page-content.html',
  styleUrl: './main-page-content.css',
})
export class MainPageContent {
  allConferences:any[] = []
  constructor(private apiService  : Api,) {}

  ngOnInit() {
      this.getAllConferences();


  }


  getAllConferences(): void {
    this.apiService.getConferences().subscribe({
        next: (res:any) => {
          this.allConferences = res.results;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'خطا در دریافت اطلاعات',
            confirmButtonText: 'تلاش مجدد'
          }).then(
            (result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            }
          );
        }
      }



    );
  }



}
