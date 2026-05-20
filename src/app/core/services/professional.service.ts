import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professional } from '../models/professional';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  baseUrl = 'http://localhost:3000/professionals';

  constructor(private http: HttpClient) {}

  getProfessionals(): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.baseUrl);
  }
}
