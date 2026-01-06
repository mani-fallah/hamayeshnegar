import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getConferences() {
    return this.http.get( this.baseUrl +'conferences/');
  }

  getConferenceBySlug(slug: any) {
    return this.http.get(`${this.baseUrl}conferences/${slug}/`);
  }
}
