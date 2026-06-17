import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professional } from '../models/professional';
import { Observable, of } from 'rxjs';
import { Time } from 'src/app/modules/schedule/components/time/models/time';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  baseUrl = environment.baseUrl + '/professionals';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {}

  getAvailableDays(
    professional: Professional,
    calendar: Date,
  ): Observable<number[]> {
    let month = calendar.getMonth() + 1;
    let year = calendar.getFullYear();
    let url = `${this.baseUrl}/${professional.id}/availability-days?year=${year}&month=${month}`;

    // TODO: Replace this when backend is available
    return this.http.get<number[]>(url);

    // return of([
    //   Math.floor(Math.random() * 20) + 1,
    //   Math.floor(Math.random() * 20) + 1,
    //   Math.floor(Math.random() * 20) + 1,
    //   Math.floor(Math.random() * 20) + 1,
    //   Math.floor(Math.random() * 20) + 1,
    // ]);
  }

  getAvailableTimes(
    professional: Professional,
    selecteDate: Date,
  ): Observable<Time[]> {
    let date = this.datePipe.transform(selecteDate, 'yyyy-MM-dd');
    let url = `${this.baseUrl}/${professional.id}/availability-times?date=${date}`;

    return this.http.get<Time[]>(url);

    // return of([
    //   {
    //     startTime: '08:00:00',
    //     endTime: '08:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '08:30:00',
    //     endTime: '09:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '09:00:00',
    //     endTime: '09:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '09:30:00',
    //     endTime: '10:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '10:00:00',
    //     endTime: '10:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '10:30:00',
    //     endTime: '11:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '11:30:00',
    //     endTime: '12:00:00',
    //     available: Math.random() >= 0.5,
    //   },

    //   {
    //     startTime: '12:00:00',
    //     endTime: '12:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '12:30:00',
    //     endTime: '13:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '13:00:00',
    //     endTime: '13:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '13:30:00',
    //     endTime: '14:00:00',
    //     available: Math.random() >= 0.5,
    //   },

    //   {
    //     startTime: '14:00:00',
    //     endTime: '14:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '14:30:00',
    //     endTime: '15:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '15:00:00',
    //     endTime: '15:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '15:30:00',
    //     endTime: '16:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '16:00:00',
    //     endTime: '16:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '16:30:00',
    //     endTime: '17:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '17:00:00',
    //     endTime: '17:30:00',
    //     available: Math.random() >= 0.5,
    //   },
    //   {
    //     startTime: '17:30:00',
    //     endTime: '18:00:00',
    //     available: Math.random() >= 0.5,
    //   },
    // ]);
  }

  create(professional: Professional): Observable<Professional> {
    return this.http.post<Professional>(this.baseUrl, professional);
  }

  update(professional: Professional): Observable<void> {
    let url = `${this.baseUrl}/${professional.id}`;
    return this.http.put<void>(url, professional);
  }

  getProfessionalById(id: number): Observable<Professional> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Professional>(url);
  }

  getProfessionalsPage(
    professionalFilter: string,
    page: number,
  ): Observable<HttpResponse<Professional[]>> {
    let url = `${this.baseUrl}?name_like=${professionalFilter}&_page=${page}&_limit=10&_sort=name`;
    return this.http.get<Professional[]>(url, { observe: 'response' });
  }

  delete(professional: Professional): Observable<Professional> {
    let url = `${this.baseUrl}/${professional.id}`;
    return this.http.delete<Professional>(url);
  }
}
