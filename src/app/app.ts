import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import { NgxSpinnerModule } from 'ngx-spinner';
import {Busy} from './_services/busy';
import { Api } from './_services/api';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule,  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hamayesh');
  constructor() { }




}
