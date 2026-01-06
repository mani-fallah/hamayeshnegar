import { Component } from '@angular/core';
import {Header} from '../header/header';
import {MainPageContent} from '../main-page-content/main-page-content';

@Component({
  selector: 'app-main-page',
  imports: [
    Header,
    MainPageContent
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {

}
