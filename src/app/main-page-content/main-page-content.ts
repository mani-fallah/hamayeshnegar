import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, startWith, takeUntil, observeOn, asapScheduler } from 'rxjs';

import Swal from 'sweetalert2';
import { Api } from '../_services/api';

type MainVm = {
  loading: boolean;
  errorMsg: string;
  allConferences: any[];
};

@Component({
  selector: 'app-main-page-content',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-page-content.html',
  styleUrl: './main-page-content.css',
})
export class MainPageContent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  vm$!: Observable<MainVm>;

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    console.log('main page content initialized');
    this.load();
  }

  load(): void {
    this.vm$ = this.apiService.getConferences().pipe(
      /**
       * این خط مخصوصاً برای سناریوی Back/Forward کمک می‌کنه
       * تا emission همزمان (sync) باعث ExpressionChanged نشه.
       */
      observeOn(asapScheduler),

      map((res: any) => ({
        loading: false,
        errorMsg: '',
        allConferences: res?.results ?? [],
      })),
      startWith({ loading: true, errorMsg: '', allConferences: [] }),
      catchError(() => {
        // هم vm را به حالت خطا می‌بریم، هم پیام sweetalert
        void Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'خطا در دریافت اطلاعات',
          confirmButtonText: 'تلاش مجدد',
        }).then((result) => {
          if (result.isConfirmed) {
            this.load(); // به جای reload کل صفحه، دوباره درخواست می‌زنیم
          }
        });

        return of({ loading: false, errorMsg: 'خطا در دریافت اطلاعات', allConferences: [] });
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
