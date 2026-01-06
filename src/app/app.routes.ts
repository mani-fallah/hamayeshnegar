import { Routes } from '@angular/router';
import { MainPage} from './main-page/main-page';
import {Home} from './home/home';
import {ConferenceDetail} from './conference-detail/conference-detail';
import {PageNotFound} from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    component: MainPage,
  },
  { path: 'conference/:slug',
    component: ConferenceDetail },




  // not found page
  {path : '**', component: PageNotFound}

];
