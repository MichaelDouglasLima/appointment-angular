import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  getClients(params: string = ''): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + params);
  }
}
