import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  baseUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }
}
