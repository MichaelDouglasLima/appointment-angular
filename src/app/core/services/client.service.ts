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

  getClients(clientNameFilter: string): Observable<Client[]> {
    let url = `${this.baseUrl}?name_like=${clientNameFilter}`;
    return this.http.get<Client[]>(url);
  }

  deleteClient(client: Client): Observable<Client> {
    return this.http.delete<Client>(
      `http://localhost:3000/clients/${client.id}`,
    );
  }
}
