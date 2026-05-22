import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Time } from 'src/app/modules/schedule/components/time/models/time';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor() {}

  getTimes(): Observable<Time[]> {
    return of([
      { startTime: '08:00:00', endTime: '08:30:00', available: true },
      { startTime: '08:30:00', endTime: '09:00:00', available: true },
      { startTime: '09:00:00', endTime: '09:30:00', available: false },
      { startTime: '09:30:00', endTime: '10:00:00', available: false },
      { startTime: '10:00:00', endTime: '10:30:00', available: false },
      { startTime: '10:30:00', endTime: '11:00:00', available: false },
      { startTime: '11:30:00', endTime: '12:00:00', available: false },

      { startTime: '12:00:00', endTime: '12:30:00', available: false },
      { startTime: '12:30:00', endTime: '13:00:00', available: false },
      { startTime: '13:00:00', endTime: '13:30:00', available: false },
      { startTime: '13:30:00', endTime: '14:00:00', available: false },

      { startTime: '14:00:00', endTime: '14:30:00', available: false },
      { startTime: '14:30:00', endTime: '15:00:00', available: false },
      { startTime: '15:00:00', endTime: '15:30:00', available: false },
      { startTime: '15:30:00', endTime: '16:00:00', available: false },
      { startTime: '16:00:00', endTime: '16:30:00', available: false },
      { startTime: '16:30:00', endTime: '17:00:00', available: false },
      { startTime: '17:00:00', endTime: '17:30:00', available: false },
      { startTime: '17:30:00', endTime: '18:00:00', available: false },
    ]);
  }
}
