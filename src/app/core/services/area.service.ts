import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../models/area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  baseUrl = 'http://localhost:3000/areas';

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseUrl);
  }
}
