import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Subject, switchMap, takeUntil, map, of, catchError, startWith, observable, Observable} from 'rxjs';
import { Api } from '../_services/api';
import {Header} from '../header/header';

@Component({
  selector: 'app-conference-detail',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
})
export class ConferenceDetail implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  vm$!: Observable<any>;
  constructor(private route: ActivatedRoute, private apiService: Api) {}

  // استیت را به شکل stream نگه می‌داریم



  ngOnInit(): void {
    this.vm$ = this.route.paramMap.pipe(
      map(params => params.get('slug')),
      switchMap(slug => {
        if (!slug) {
          return of({ loading: false, errorMsg: 'Slug در آدرس وجود ندارد', conference: null });
        }

        return this.apiService.getConferenceBySlug(slug).pipe(
          map(conference => ({ loading: false, errorMsg: '', conference })),
          startWith({ loading: true, errorMsg: '', conference: null }),
          catchError(() => of({ loading: false, errorMsg: 'خطا در دریافت اطلاعات همایش', conference: null }))
        );
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
