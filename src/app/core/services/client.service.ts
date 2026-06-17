import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = environment.baseUrl + '/clients';

  constructor(private http: HttpClient) {}

  getClientsPage(
    clientNameFilter: string,
    page: number,
  ): Observable<Page<Client>> {
    let url = `${this.baseUrl}?name_like=${clientNameFilter}&_page=${page}&_limit=10&_sort=name`;
    return this.http.get<Page<Client>>(url);
  }

  // getClientsPage(
  //   clientNameFilter: string,
  //   page: number,
  // ): Observable<HttpResponse<Client[]>> {
  //   let url = `${this.baseUrl}?name_like=${clientNameFilter}&_page=${page}&_limit=10&_sort=name`;
  //   return this.http.get<Client[]>(url, { observe: 'response' });
  // }

  getClientsWithNameContaining(
    clientNameFilter: string,
  ): Observable<Page<Client>> {
    let url = `${this.baseUrl}?name_like=${clientNameFilter}&_sort=name&_limit=10`;
    return this.http.get<Page<Client>>(url);
  }

  // getClientsWithNameContaining(clientNameFilter: string): Observable<Client[]> {
  //   let url = `${this.baseUrl}?name_like=${clientNameFilter}&_sort=name&_limit=10`;
  //   return this.http.get<Client[]>(url);
  // }

  save(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  getClientById(id: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  update(client: Client): Observable<void> {
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.put<void>(url, client);
  }

  delete(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.delete<Client>(url);
  }
}
